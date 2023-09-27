using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;
using Microsoft.AspNetCore.Mvc;

namespace LevelsCompletionTracker.WebApi.Controllers
{
    [ApiController]
    [Route("api/ProgressController")]
    public class ProgressController
    {
        private readonly ProgressInteractor progressInteractor;

        public ProgressController(ProgressInteractor progressInteractor)
        {
            this.progressInteractor = progressInteractor;
        }
        
        [HttpPost("create")]
        public async Task<Response> CreateProgressAsync(ProgressDto progressDto, int levelId)
        {
            return await progressInteractor.CreateProgressAsync(progressDto, levelId);
        }

        [HttpDelete("remove")]
        public async Task<Response> RemoveProgressAsync(int progressId)
        {
            return await progressInteractor.RemoveProgressAsync(progressId);
        }

        [HttpDelete("remove-all")]
        public async Task<Response> RemoveAllAsync(int levelId)
        {
            return await progressInteractor.ClearAllProgresses(levelId);
        }
    }
}