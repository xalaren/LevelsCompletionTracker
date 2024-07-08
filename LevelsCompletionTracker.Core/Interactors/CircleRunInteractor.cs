using LevelsCompletionTracker.Core.Mappers;
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

        public CircleRunInteractor(ICircleRunRepository circleRunRepository, IUnitOfWork unitOfWork, ILevelRepository levelRepository = null)
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
                        ResultMessage = "Progress was null or empty",
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

                    existCircleRun.CreatedAt = DateTime.Now;

                    level.CircleRuns.Add(existCircleRun);
                }
                else
                {
                    existCircleRun.Attempts = circleRunDto.Attempts;
                    existCircleRun.Count = circleRunDto.Count;
                }

                circleRunRepository.Update(existCircleRun);

                levelRepository.Update(level);
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
    }
}
