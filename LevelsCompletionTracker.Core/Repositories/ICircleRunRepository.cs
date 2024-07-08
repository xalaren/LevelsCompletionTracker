
using LevelsCompletionTracker.Core.Model;

namespace LevelsCompletionTracker.Core.Repositories
{
    public interface ICircleRunRepository
    {
        Task<CircleRun?> FindByDateTimeInLevel(int levelId, DateTime now);
        void Update(CircleRun circleRun);
    }
}
