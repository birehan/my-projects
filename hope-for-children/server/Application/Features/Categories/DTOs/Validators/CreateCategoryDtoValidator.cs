using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Categories.DTOs.Validators
{
    public class CreateCategoryDtoValidator : AbstractValidator<CreateCategoryDto>
    {
        public CreateCategoryDtoValidator()
        {
            Include(new ICategoryDtoValidator());
        }

    }
}
