
using LevelsCompletionTracker.Core.Model;

namespace LevelsCompletionTracker.Core.Repositories
{
    public interface ICircleRunRepository
    {
        Task CreateAsync(CircleRun circleRun);
        Task<CircleRun?> FindByDateTimeInLevel(int levelId, DateTime now);
        Task<CircleRun?> GetAsync(int circleRunId);
        void Remove(CircleRun? circleRun);
        void RemoveAllFromLevel(int levelId);
        void Update(CircleRun circleRun);
    }
}
