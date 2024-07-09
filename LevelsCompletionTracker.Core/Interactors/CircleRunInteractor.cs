using LevelsCompletionTracker.Core.Mappers;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;
using LevelsCompletionTracker.Core.Transaction;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.Core.Interactors
{
    public class CircleRunInteractor
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly ICircleRunRepository circleRunRepository;
        private readonly ILevelRepository levelRepository;

        public CircleRunInteractor(ICircleRunRepository circleRunRepository, IUnitOfWork unitOfWork, ILevelRepository levelRepository)
        {
            this.circleRunRepository = circleRunRepository;
            this.unitOfWork = unitOfWork;
            this.levelRepository = levelRepository;
        }

        public async Task<Response> CreateCircleRunAsync(CircleRunDto circleRunDto)
        {
            try
            {
                if (circleRunDto == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Circle run was null or empty",
                    };
                }

                var level = await levelRepository.GetAsync(circleRunDto.LevelId);

                if (level == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Level not found",
                    };
                }

                var existCircleRun = await circleRunRepository.FindByDateTimeInLevel(circleRunDto.LevelId, DateTime.Now);

                if (existCircleRun == null)
                {
                    existCircleRun = circleRunDto.ToEntity();
                    existCircleRun.Count++;
                    existCircleRun.CreatedAt = DateTime.Now;

                    await circleRunRepository.CreateAsync(existCircleRun);
                }
                else
                {
                    existCircleRun.Attempts += circleRunDto.Attempts;
                    existCircleRun.Count++;

                    circleRunRepository.Update(existCircleRun);
                }

                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Circle run successfully added"
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

        public async Task<Response> RemoveCircleRunAsync(int circleRunId)
        {
            try
            {
                CircleRun? circleRun = await circleRunRepository.GetAsync(circleRunId); 

                if (circleRunRepository == null)
                {
                    return new Response()
                    {
                        Error = true,
                        ResultMessage = "Circle run not found",
                    };
                }

                circleRunRepository.Remove(circleRun);

                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Circle run has been successfully removed",
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

        public Response RemoveAllCircleRunsFromLevel(int levelId)
        {
            try
            {
                circleRunRepository.RemoveAllFromLevel(levelId);
                unitOfWork.Commit();

                return new Response()
                {
                    Error = false,
                    ResultMessage = "Circle runs has been successfully removed",
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
    }
}
