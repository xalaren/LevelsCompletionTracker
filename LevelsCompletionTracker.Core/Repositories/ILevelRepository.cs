using LevelsCompletionTracker.Core.Model;

namespace LevelsCompletionTracker.Core.Repositories
{
    public interface ILevelRepository
    {
        public Task CreateAsync(Level level);
        public void Remove(Level level);
        public Task UpdateAsync(Level level);
        public void Update(Level level);
        public Task<Level?> GetAsync(int id);
        public Task<Level[]?> GetLevelsByNameAsync(string name);
        public Task<Level[]> GetAllAsync();
        public Task<Level?> GetLevelByPriorityAsync(int priority);
    }
}
