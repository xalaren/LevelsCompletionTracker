
using LevelsCompletionTracker.Core.Model;

namespace LevelsCompletionTracker.Core.Repositories
{
    public interface ICircleRunRepository
    {
        Task CreateAsync(CircleRun circleRun);
        Task<CircleRun?> FindByDateTimeInLevel(int levelId, DateTime now);
        void Update(CircleRun circleRun);
    }
}
