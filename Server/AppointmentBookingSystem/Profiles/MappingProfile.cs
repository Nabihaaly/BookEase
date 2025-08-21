using AppointmentBookingSystem.DTO;
using AppointmentBookingSystem.Models;
using AutoMapper;

namespace AppointmentBookingSystem.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Appointment mappings
            CreateMap<Appointment, AppointmentDto>()
                 .ForMember(dest => dest.ServiceTitle, opt => opt.MapFrom(src => src.Service.Title))
                .ForMember(dest => dest.DurationMinutes, opt => opt.MapFrom(src => src.Service.DurationMinutes))
                .ForMember(dest => dest.ServiceOwnerName, opt => opt.MapFrom(src => src.Service.ServiceOwner.Name));
                

        // Service Owner specific appointment mapping
        CreateMap<Appointment, ServiceOwnerAppointmentDto>()
                .ForMember(dest => dest.ServiceTitle, opt => opt.MapFrom(src => src.Service.Title))
                .ForMember(dest => dest.ServicePrice, opt => opt.MapFrom(src => src.Service.Price))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Name))
                .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.User.Email));

            // Service mappings
            CreateMap<Service, ServiceDto>()
                .ForMember(dest => dest.ServiceOwnerID, opt => opt.MapFrom(src => src.ServiceOwner.ID))
                .ForMember(dest => dest.ServiceOwnerName, opt => opt.MapFrom(src => src.ServiceOwner.Name));


            CreateMap<Service, ServiceOwnerServiceDto>();

            // ServiceOwner mappings

            CreateMap<ServiceOwner, ServiceOwnerDto>()
                .ForMember(dest => dest.CategoryName, 
                opt => opt.MapFrom(src => src.Category.Name));

            //CreateMap<ServiceOwner, ServiceOwnerProfileDto>()
                //.ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));


            // ServiceCategory mappings
            CreateMap<ServiceCategory, ServiceCategoryDto>();

            

        }
    }
}
