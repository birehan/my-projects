import 'package:hakim_hub_mobile/core/utils/dummy_data.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_education_model.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_experiance_model.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';

class DoctorDetailModel extends DoctorDetail {
  DoctorDetailModel({
    required String fullName,
    required String about,
    required String gender,
    required String email,
    required String photoUrl,
    required int yearsOfExperience,
    required String mainInstitutionId,
    required String mainInstitutionName,
    required List<String> specialities,
    required List<EducationModel> educations,
    required List<ExperienceModel> experiences,
    required String id,
  }) : super(
          fullName: fullName,
          about: about,
          gender: gender,
          email: email,
          photoUrl: photoUrl,
          yearsOfExperience: yearsOfExperience,
          mainInstitutionId: mainInstitutionId,
          mainInstitutionName: mainInstitutionName,
          specialities: specialities,
          educations: educations,
          experiences: experiences,
          id: id,
        );

  factory DoctorDetailModel.fromJson(Map<String, dynamic> json) {
    List<dynamic> relatedEducation = json['educations'] ?? [];
    List<EducationModel> newEducations =
        relatedEducation.map((e) => EducationModel.fromJson(e)).toList();

    List<dynamic> relatedExperiences = json['experiences'] ?? [];
    List<ExperienceModel> newExperiences =
        relatedExperiences.map((e) => ExperienceModel.fromJson(e)).toList();

    return DoctorDetailModel(
      fullName: json['fullName'] ?? "No Name",
      about: json['about'] == "" ? convertDoctorJson(json, newEducations, newExperiences) : json['about'],
      gender: json['gender'] ?? "she/her",
      email: json['email'] ?? "No Email",
      photoUrl: json['photoUrl'] ?? "assets/images/doctor_image.png",
      yearsOfExperience: (json['yearsOfExperience'] ?? 0),
      mainInstitutionId: json['mainInstitutionId'] ?? "No Institution",
      mainInstitutionName: json['mainInstitutionName'] ?? "No Institution",
      specialities: List<String>.from(json['specialities'] ?? []),
      educations: newEducations,
      experiences: newExperiences,
      id: json['id'] ?? "No Id",
    );
  }
}
