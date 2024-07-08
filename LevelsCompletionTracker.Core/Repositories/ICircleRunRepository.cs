using LevelsCompletionTracker.Core.Model;

namespace LevelsCompletionTracker.Core.Repositories
{
    public interface ICircleRunRepository
    {
        Task<CircleRun> FindByDateTimeInLevel(Level level, DateTime date);
        Task<CircleRun?> GetAsync(int circleRunId);
        Task CreateAsync(CircleRun circleRun);
        void Update(CircleRun circleRun);
        void Remove(CircleRun circleRun);
    }
}
