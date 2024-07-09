using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class GetAllLevelsEndpoint : Endpoint<EmptyRequest, Response<LevelDto[]>>
    {
        private readonly LevelInteractor levelInteractor;

        public GetAllLevelsEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Get("get-all");
            Group<LevelEndpoints>();
            AllowAnonymous();
        }

        public override async Task HandleAsync(EmptyRequest request, CancellationToken token)
        {
            var response = await levelInteractor.GetAllLevelsAsync();

            if (!response.Error)
            {
                await SendAsync(response, 200, token);
            }
            else
            {
                await SendAsync(response, 401, token);
            }
        }
    }
}
