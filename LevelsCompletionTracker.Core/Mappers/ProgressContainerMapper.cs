using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Shared.DataTransferObjects;

namespace LevelsCompletionTracker.Core.Mappers
{
    public static class ProgressContainerMapper
    {
        public static ProgressContainerDto ToDto(this ProgressContainer progressContainer)
        {
            return new ProgressContainerDto()
            {
                Id = progressContainer.Id,
                LevelId = progressContainer.LevelId,
                Progresses = progressContainer.Progresses.Select(progress => progress.ToDto()).OrderByDescending(progress => progress.Id).ToList(),
                CreatedAt = progressContainer.CreatedAt.ToShortDateString(),
            };
        }
        
        public static ProgressContainer ToEntity(this ProgressContainerDto progressContainerDto)
        {
            DateTime createdAt = progressContainerDto.CreatedAt == null ? DateTime.UtcNow : DateTime.Parse(progressContainerDto.CreatedAt);

            return new ProgressContainer()
            {
                Id = progressContainerDto.Id,
                LevelId = progressContainerDto.LevelId,
                Progresses = progressContainerDto.Progresses.Select(progressDto => progressDto.ToEnity()).ToList(),
                CreatedAt = createdAt,
            };
        }
    }
}