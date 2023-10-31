import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_education.dart';

class EducationModel extends Education {
  

  EducationModel({
    required degree,
    required institution,
    required startDate,
    required endDate,
    required fieldOfStudy,
    required logoUrl
  }) : super(
          degree: degree,
          institution: institution,
          startDate: startDate,
          endDate: endDate,
          fieldOfStudy: fieldOfStudy,
          logoUrl: logoUrl
        );

  factory EducationModel.fromJson(Map<String, dynamic> json) {
    return EducationModel(
      degree: json['degree'] ?? "No Degree",
      institution: json['educationInstitution'] ?? "No Institution",
      startDate: DateTime.parse(json['startYear'] ?? DateTime.now()),
      endDate: DateTime.parse(json['graduationYear'] ?? DateTime.now()),
      fieldOfStudy: json['fieldOfStudy'] ?? "No Field",
    logoUrl: json['educationInstitutionLogoUrl'] ?? "assets/images/doctor_image.png"
      
    );
  }
}
