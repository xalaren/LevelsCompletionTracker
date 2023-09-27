using System.Linq;
using System.Linq.Expressions;
using LevelsCompletionTracker.Core.Mappers;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;
using LevelsCompletionTracker.Core.Transaction;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.Core.Interactors
{
    public enum Difficulties
    {
        Easy,
        Normal,
        Hard,
        Harder,
        Insane,
        EasyDemon,
        MediumDemon,
        HardDemon,
        InsaneDemon,
        ExtremeDemon,
    }

    public enum Statuses
    {
        Active,
        Abandoned,
        Completed
    }

    public class LevelInteractor
    {
        private readonly ILevelRepository levelRepository;
        private readonly IUnitOfWork unitOfWork;

        public LevelInteractor(ILevelRepository levelRepository, IUnitOfWork unitOfWork)
        {
            this.levelRepository = levelRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Response> CreateLevelAsync(LevelDto levelDto)
        {
            if (levelDto == null)
            {
                return new Response
                {
                    Error = true,
                    ResultMessage = "Level data was empty",
                };
            }
            if (string.IsNullOrWhiteSpace(levelDto.Name) || string.IsNullOrWhiteSpace(levelDto.Difficulty))
            {
                return new Response
                {
                    Error = true,
                    ResultMessage = "Name or difficulty was empty"
                };
            }

            var existingLevels = await levelRepository.GetAllAsync();

            var level = new Level()
            {
                Name = levelDto.Name,
                Author = levelDto.Author,
                Attempts = 0,
                Difficulty = levelDto.Difficulty,
                Priority = existingLevels.Length + 1,
                Status = "active",
            };

            try
            {
                await levelRepository.CreateAsync(level);
                unitOfWork.Commit();

                return new Response
                {
                    Error = false,
                    ResultMessage = "Level succesfully created",
                };
            }
            catch (Exception)
            {
                return new Response
                {
                    Error = true,
                    ResultMessage = "Cannot create a level"
                };
            }
        }

        public async Task<Response<LevelDto>> GetLevelAsync(int id)
        {
            try
            {
                var level = await levelRepository.GetAsync(id);

                if (level == null)
                {
                    return new()
                    {
                        Error = true,
                        ResultMessage = "Level not found",
                    };
                }

                return new Response<LevelDto>()
                {
                    Error = false,
                    Value = level.ToDto(),
                };
            }
            catch (Exception)
            {
                return new()
                {
                    Error = true,
                    ResultMessage = "Cannot get a level. Internal error",
                };
            }
        }

        public async Task<Response<LevelDto[]>> GetAllLevelsAsync()
        {
            try
            {
                var levels = await levelRepository.GetAllAsync();

                return new Response<LevelDto[]>()
                {
                    Error = false,
                    ResultMessage = "Success",
                    Value = levels.Select(level => level.ToDto()).ToArray(),
                };
            }
            catch (Exception)
            {
                return new Response<LevelDto[]>()
                {
                    Error = true,
                    ResultMessage = "Cannot get the levels",
                };
            }
        }

        public async Task<Response> RemoveLevelAsync(int id)
        {
            try
            {
                var level = await levelRepository.GetAsync(id);
                var levels = (await levelRepository.GetAllAsync()).ToList();

                if (level == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Level not found"
                    };
                }

                if (levels == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Levels not found"
                    };
                }

                var index = levels.IndexOf(level);

                levelRepository.Remove(level);
                levels.Remove(level);

                unitOfWork.Commit();

                RefreshNextPriorities(index, levels);

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Level successfully removed",
                };
            }
            catch (Exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = "Cannot remove the level"
                };
            }
        }

        public async Task<Response> ChangeStatusOfTheLevelAsync(int id, string state)
        {
            try
            {
                var level = await levelRepository.GetAsync(id);
                state = state.ToLower();

                if (level == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Level does not exist"
                    };
                }

                level.Status = state;

                await levelRepository.UpdateAsync(level);
                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Level status was changed successfully",
                };
            }
            catch (ArgumentOutOfRangeException)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = "Unavailable status",
                };
            }
            catch (Exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = "Cannot change the status of the level",
                };
            }
        }

        private void RefreshNextPriorities(int index, List<Level> levels)
        {
            for (int i = index; i < levels.Count; i++)
            {
                levels[i].Priority = i + 1;
                levelRepository.Update(levels[i]);
                unitOfWork.Commit();
            }
        }

        public async Task<Response> ChangePriority(int id, bool increase)
        {
            try
            {
                var level = await levelRepository.GetAsync(id);

                if (level == null)
                {
                    return new Response
                    {
                        Error = true,
                        ResultMessage = "Level not found",
                    };
                }

                var nextLevelModifier = 1;

                if (increase)
                {
                    nextLevelModifier = -1;
                }

                var next = await levelRepository.GetLevelByPriorityAsync(level.Priority + nextLevelModifier);

                if (next == null)
                {
                    return new Response
                    {
                        Error = true,
                        ResultMessage = increase ? "Level is on top of the list" : "Level is on bottom of the list"
                    };
                }

                level.Priority += nextLevelModifier;
                next.Priority -= nextLevelModifier;

                levelRepository.Update(level);
                levelRepository.Update(next);

                unitOfWork.Commit();

                return new Response
                {
                    Error = false,
                    ResultMessage = "Level priority is successfully changed",
                };
            }
            catch (Exception)
            {
                return new Response
                {
                    Error = true,
                    ResultMessage = "Unable to increase priority",
                };
            }
        }

        public async Task<Response> SetAttemptsAsync(int id, int attempts, bool append)
        {
            try
            {
                if (attempts < 0)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Attempts cannot be negative",
                    };
                }

                var level = await levelRepository.GetAsync(id);

                if (level == null)
                {
                    return new Response
                    {
                        Error = true,
                        ResultMessage = "Level not found",
                    };
                }


                if (append)
                {
                    level.Attempts += attempts;
                }
                else
                {
                    level.Attempts = attempts;
                }

                levelRepository.Update(level);
                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Successfully set attempts",
                };
            }
            catch (Exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = "Cannot set attempts. Internal error",
                };
            }
        }

        public async Task<Response> SetMainProgressAsync(int id, int progress)
        {
            try
            {
                var level = await levelRepository.GetAsync(id);

                if (level == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Level not found",
                    };
                }

                level.MainProgress = progress;

                levelRepository.Update(level);
                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Main progress is successfully set",
                };
            }
            catch (ArgumentOutOfRangeException exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = exception.Message,
                };
            }
            catch (Exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = "Cannot set main progress. Internal error",
                };
            }
        }
    }
}
