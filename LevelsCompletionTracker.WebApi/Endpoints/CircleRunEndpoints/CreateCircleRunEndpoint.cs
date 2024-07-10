using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.CircleRunEndpoints
{
    public class CreateCircleRunEndpoint : Endpoint<CircleRunDto, Response>
    {
        private readonly CircleRunInteractor circleRunInteractor;

        public CreateCircleRunEndpoint(CircleRunInteractor circleRunInteractor)
        {
            this.circleRunInteractor = circleRunInteractor;
        }

        public override void Configure()
        {
            Post("create");
            AllowAnonymous();
            Group<CircleRunEndpoints>();
        }

        public override async Task HandleAsync(CircleRunDto request, CancellationToken token)
        {
            var response = await circleRunInteractor.CreateCircleRunAsync(request);

            int code = response.Error ? 400 : 200;
            await SendAsync(response, code, token);
        }
    }
}
