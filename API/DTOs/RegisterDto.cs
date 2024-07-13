﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
  [Required]
  [StringLength(8, MinimumLength = 4)]
  public string Username { get; set; } = string.Empty;
  [Required]
  [StringLength(8, MinimumLength = 4)]
  public required string Password { get; set; } = string.Empty;
}