import 'package:equatable/equatable.dart';

class DoctorDomain extends Equatable {
  final String fullName;
  final String about;
  final String gender;
  final String? email;
  final String photoUrl;
  final int yearsOfExperience;
  final String mainInstitutionId;
  final String mainInstitutionName;
  final List<String> specialities;
  final String id;

  DoctorDomain({
    required this.fullName,
    required this.about,
    required this.gender,
    required this.email,
    required this.photoUrl,
    required this.yearsOfExperience,
    required this.mainInstitutionId,
    required this.mainInstitutionName,
    required this.specialities,
    required this.id,
  });

  @override
  List<Object?> get props => [
        fullName,
        about,
        gender,
        email,
        photoUrl,
        yearsOfExperience,
        mainInstitutionId,
        mainInstitutionName,
        specialities,
        id,
      ];

  toJson() {}
}
