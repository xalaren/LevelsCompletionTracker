using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Shared.DataTransferObjects;

namespace LevelsCompletionTracker.Core.Mappers
{
    public static class LevelMapper
    {
        public static LevelDto ToDto(this Level level)
        {
            if(level == null)
            {
                throw new ArgumentNullException("Level was null", nameof(level));
            }

            return new LevelDto()
            {
                Id = level.Id,
                Name = level.Name,
                Author = level.Author,
                Attempts = level.Attempts,
                Difficulty = level.Difficulty,
                Status = level.Status,
                MainProgress = level.MainProgress,
                Priority = level.Priority,
                ProgressContainers = level.ProgressContainers
                    .Select(container => container.ToDto())
                    .Where(container => container.Progresses.Count > 0)
                    .OrderByDescending(container => container.Id).ToList(),
            };
        }

        public static Level ToEntity(this LevelDto levelDto)
        {
            if(levelDto == null)
            {
                throw new ArgumentNullException("", "LevelDto was null");
            }

            return new Level()
            {
                Id = levelDto.Id,
                Name = levelDto.Name,
                Author = levelDto.Author,
                Attempts = levelDto.Attempts,
                Difficulty = levelDto.Difficulty,
                MainProgress = levelDto.MainProgress,
                Priority = levelDto.Priority,
                Status = levelDto.Status,
                ProgressContainers = levelDto.ProgressContainers.Select(containerDto => containerDto.ToEntity()).ToList(),
            };
        }
    }
}
