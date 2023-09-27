using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LevelsCompletionTracker.Adapter.RepositoriesEF
{
    public class LevelRepository : ILevelRepository
    {
        private readonly AppDbContext context;

        public LevelRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task CreateAsync(Level level)
        {
            if (level == null)
            {
                throw new ArgumentNullException("Level was empty", nameof(level));
            }

            await context.Levels.AddAsync(level);
        }

        public async Task<Level?> GetAsync(int id)
        {
            var level = await context.FindAsync<Level>(id);

            if (level != null)
            {
                await context.Entry(level)
                    .Collection(level => level.ProgressContainers)
                    .LoadAsync();

                foreach (var progressContainer in level.ProgressContainers)
                {
                    await context.Entry(progressContainer)
                        .Collection(progressContainer => progressContainer.Progresses)
                        .LoadAsync();
                }
            }

            return level;
        }

        public async Task<Level[]> GetAllAsync()
        {
            var levels = context.Levels;

            foreach (var level in levels)
            {
                await context.Entry(level)
                    .Collection(level => level.ProgressContainers)
                    .LoadAsync();
                
                foreach (var progressContainer in level.ProgressContainers)
                {
                    await context.Entry(progressContainer)
                        .Collection(progressContainer => progressContainer.Progresses)
                        .LoadAsync();
                }
            }

            return await levels.OrderBy(level => level.Priority).ToArrayAsync();
        }

        public async Task<Level[]?> GetLevelsByNameAsync(string name)
        {
            return await context.Levels.Where(level => level.Name.ToLower() == name.ToLower()).ToArrayAsync();
        }

        public void Remove(Level level)
        {
            if (level == null)
            {
                throw new Exception("Level not found");
            }

            context.Levels.Remove(level);
        }

        public async Task UpdateAsync(Level level)
        {
            if (level == null)
            {
                throw new ArgumentNullException("", "Level was null or empty");
            }

            await Task.Delay(1);
            context.Levels.Update(level);
        }

        public void Update(Level level)
        {
            if (level == null)
            {
                throw new ArgumentNullException("", "Level was null or empty");
            }

            context.Levels.Update(level);
        }

        public async Task<Level?> GetLevelByPriorityAsync(int priority)
        {
            return await context.Levels.FirstOrDefaultAsync(level => level.Priority == priority);
        }
    }
}
