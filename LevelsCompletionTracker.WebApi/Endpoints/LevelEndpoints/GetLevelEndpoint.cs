using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class GetLevelRequest
    {
        public int Id { get; set; }
    }

    public class GetLevelEndpoint : Endpoint<GetLevelRequest, Response<LevelDto>>
    {
        private readonly LevelInteractor levelInteractor;

        public GetLevelEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Get("get");
            AllowAnonymous();
            Group<LevelEndpoints>();
        }

        public override async Task HandleAsync(GetLevelRequest request, CancellationToken token)
        {
            var response = await levelInteractor.GetLevelAsync(request.Id);

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
