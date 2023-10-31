using Application.Features.Common;
using Microsoft.AspNetCore.Http;
using static Domain.Staff;

namespace Application.Features.Staffs.DTOs
{
    public class UpdateStaffDto : BaseDto, IStaffDto
    {
        public string Name { get; set; }
        public string About { get; set; }

        public string UserSector { get; set; }

        public string Title { get; set; }
        public IFormFile? File { get; set; }
    }
}