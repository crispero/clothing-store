﻿using System.ComponentModel.DataAnnotations;

namespace Server.Dto
{
    public class UserDto
    {
        public int UserId { get; set; }
        
        public int UserTypeId { get; set; }
        
        [Required]
        public string Login { get; set; }

        public string Name { get; set; }
        
        public string Surname { get; set; }
       
        public string Address { get; set; }
        
        public string PictureUrl { get; set; }
        
        public ushort GenderType { get; set; }
        
        public string Password { get; set; }
    }
}