using System;
using System.Linq.Expressions;
using System.Text;
using LevelsCompletionTracker.Core.Mappers;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;
using LevelsCompletionTracker.Core.Transaction;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.Core.Interactors
{
    public class ProgressInteractor
    {
        private readonly IProgressRepository progressRepository;
        private readonly ILevelRepository levelRepository;
        private readonly IProgressContainerRepository progressContainerRepository;
        private readonly IUnitOfWork unitOfWork;

        public ProgressInteractor(IProgressRepository progressRepository, ILevelRepository levelRepository, IProgressContainerRepository progressContainerRepository,
            IUnitOfWork unitOfWork)
        {
            this.progressRepository = progressRepository;
            this.levelRepository = levelRepository;
            this.progressContainerRepository = progressContainerRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Response> CreateProgressAsync(ProgressDto progressDto, int levelId)
        {
            try
            {
                if (progressDto == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Progress was null or empty",
                    };
                }
                
                var level = await levelRepository.GetAsync(levelId);
                
                if (level == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Level not found",
                    };
                }
                
                var progressContainer = await progressContainerRepository.FindByDateTimeInLevel(level, DateTime.Now);
                var progressEntity = progressDto.ToEnity();

                if (progressContainer == null)
                {
                    progressContainer = new ProgressContainer()
                    {
                        CreatedAt = DateTime.Now,
                    };
                    
                    progressContainer.Progresses.Add(progressEntity);
                    level.ProgressContainers.Add(progressContainer);
                }
                else
                {
                    var existProgress = progressContainer.Progresses.FirstOrDefault(progress =>
                        progress.PercentageStart == progressEntity.PercentageStart &&
                        progress.PercentageEnd == progressEntity.PercentageEnd);

                    if (existProgress == null)
                    {
                        progressContainer.Progresses.Add(progressEntity);
                    }
                    else
                    {
                        existProgress.Count += progressEntity.Count;
                    }
                }

                levelRepository.Update(level);
                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Progress successfully added"
                };

            }
            catch (Exception exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = exception.Message,
                };
            }
        }

        public async Task<Response> RemoveProgressAsync(int progressId)
        {
            try
            {
                var progress = await progressRepository.GetAsync(progressId);
                
                if(progress == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Progress not found",
                    };
                }

                progressRepository.Remove(progress);

                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Progress has successfully removed",
                };
            }
            catch(Exception exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = exception.Message,
                };
            }
        }

        public async Task<Response<string>> GetProgressesAsPlainTextAsync(int levelId)
        {
            var builder = new StringBuilder();

            var level = await levelRepository.GetAsync(levelId);

            if(level == null)
            {
                return new Response<string>()
                {
                    Error = true,
                    ResultMessage = "Level not found",
                };
            }

            foreach(var container in level.ProgressContainers)
            {
                builder.Append(container.ToDto().CreatedAt + ":\n\n");

                foreach(var progress in container.Progresses)
                {
                    builder.Append(progress.ToDto().ProgressText + "\n");
                }
            }

            if(builder.Length == 0)
            {
                builder.AppendLine("None :(");
            }

            return new Response<string>()
            {
                Error = false,
                ResultMessage = "Successfully get progresses",
                Value = builder.ToString(),
            };
        }

        public async Task<Response> ClearAllProgressesAsync(int levelId)
        {
            try
            {
                var level = await levelRepository.GetAsync(levelId);

                if(level == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Level not found",
                    };
                }

                level.ProgressContainers.Clear();
                levelRepository.Update(level);
                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Progresses has successfully cleared",
                };
                
            }
            catch(Exception exception)
            {
                return new Response()
                {
                    Error = true,
                    ResultMessage = exception.Message,
                };
            }
        }
    }
}
