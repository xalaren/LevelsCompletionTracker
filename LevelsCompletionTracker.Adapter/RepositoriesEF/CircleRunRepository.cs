﻿using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Adapter.Helpers;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LevelsCompletionTracker.Adapter.RepositoriesEF
{
    public class CircleRunRepository : ICircleRunRepository
    {
        private readonly AppDbContext context;

        public CircleRunRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task CreateAsync(CircleRun circleRun)
        {
            if(circleRun == null)
            {
                throw new ArgumentNullException(nameof(circleRun), "Circle run was null");
            }

            await context.AddAsync(circleRun);
        }

        public async Task<CircleRun?> FindByDateTimeInLevel(int levelId, DateTime date)
        {
            var circleRuns = await context.CircleRuns.Where(circleRun => circleRun.LevelId == levelId).ToArrayAsync();

            if(circleRuns.Length == 0)
            {
                return null;
            }

            return circleRuns.FirstOrDefault(circleRun => circleRun.CreatedAt.IsComparedByDate(date));
        }

        public async Task<CircleRun?> GetAsync(int circleRunId)
        {
            return await context.CircleRuns.FindAsync(circleRunId);
        }

        public void Remove(CircleRun? circleRun)
        {
            if(circleRun == null)
            {
                throw new ArgumentNullException(nameof(circleRun), "Circle run was null");
            }

            context.Remove(circleRun);
        }

        public void RemoveAllFromLevel(int levelId)
        {
            var circleRuns = context.CircleRuns
                .Where(circleRun => circleRun.LevelId == levelId);

            context.RemoveRange(circleRuns);
        }

        public void Update(CircleRun circleRun)
        {
            context.CircleRuns.Update(circleRun);
        }
    }
}
