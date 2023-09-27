using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;
using Microsoft.AspNetCore.Mvc;

namespace LevelsCompletionTracker.WebApi.Controllers
{
    [ApiController]
    [Route("api/LevelController")]
    public class LevelController : ControllerBase
    {
        private readonly LevelInteractor levelInteractor;

        public LevelController(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        [HttpPost("create")]
        public async Task<Response> CreateLevel(LevelDto levelDto)
        {
            return await levelInteractor.CreateLevelAsync(levelDto);
        }

        [HttpGet("get")]
        public async Task<Response<LevelDto>> GetLevel(int id)
        {
            return await levelInteractor.GetLevelAsync(id);
        }

        [HttpGet("get-all")]
        public async Task<Response<LevelDto[]>> GetAllLevels()
        {
            return await levelInteractor.GetAllLevelsAsync();
        }

        [HttpDelete("remove")]
        public async Task<Response> RemoveLevel(int id)
        {
            return await levelInteractor.RemoveLevelAsync(id);
        }

        [HttpPost("change-status")]
        public async Task<Response> ChangeStatusOfTheLevelAsync(int id, string state)
        {
            return await levelInteractor.ChangeStatusOfTheLevelAsync(id, state);
        }

        [HttpPost("change-priority")]
        public async Task<Response> ChangePriorityOfTheLevelAsync(int id, bool increase)
        {
            return await levelInteractor.ChangePriority(id, increase);
        }

        [HttpPost("set-attempts")]
        public async Task<Response> SetAttemptsAsync(int id, int attempts, bool append)
        {
            return await levelInteractor.SetAttemptsAsync(id, attempts, append);
        }

        [HttpPost("set-main-progress")]
        public async Task<Response> SetMainProgressAsync(int id, int progress)
        {
            return await levelInteractor.SetMainProgressAsync(id, progress);
        }
    }
}
