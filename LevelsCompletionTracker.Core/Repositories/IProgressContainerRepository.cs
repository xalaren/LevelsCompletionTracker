using LevelsCompletionTracker.Core.Model;

namespace LevelsCompletionTracker.Core.Repositories
{
    public interface IProgressContainerRepository
    {
        Task<ProgressContainer> FindByDateTimeInLevel(Level level, DateTime date);
        Task<ProgressContainer?> GetAsync(int progressContainerId);
        void Remove(ProgressContainer progressContainer);
    }
}