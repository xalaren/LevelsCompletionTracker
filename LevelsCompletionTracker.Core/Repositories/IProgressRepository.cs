using LevelsCompletionTracker.Core.Model;

namespace LevelsCompletionTracker.Core.Repositories
{
    public interface IProgressRepository
    {
        Task CreateAsync(Progress progress);
        Task<Progress?> GetAsync(int progressId);
        void Remove(Progress progress);
    }
}
