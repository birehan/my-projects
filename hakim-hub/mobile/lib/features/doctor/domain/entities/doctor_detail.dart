import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_education.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_experience.dart';
import 'package:equatable/equatable.dart';

class DoctorDetail extends Equatable {
  String fullName;
  String about;
  String gender;
  String email;
  String photoUrl;
  int yearsOfExperience;
  String mainInstitutionId;
  String mainInstitutionName;
  List<String> specialities;
  List<Education> educations;
  List<Experience> experiences;
  String id;

  DoctorDetail({
    required this.fullName,
    required this.about,
    required this.educations,
    required this.email,
    required this.experiences,
    required this.gender,
    required this.id,
    required this.mainInstitutionId,
    required this.mainInstitutionName,
    required this.photoUrl,
    required this.specialities,
    required this.yearsOfExperience,
  }) : super();

  @override
  List<Object> get props => [id];
}
