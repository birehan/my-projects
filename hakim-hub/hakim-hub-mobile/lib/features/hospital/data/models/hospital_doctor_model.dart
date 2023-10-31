import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';

class DoctorModel extends DoctorDomain {
  DoctorModel({
    required fullName,
    required about,
    required gender,
    required email,
    required photoUrl,
    required yearsOfExperience,
    required mainInstitutionId,
    required mainInstitutionName,
    required specialities,
    required id,
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
          id: id,
        );

  factory DoctorModel.fromJson(Map<String, dynamic> json) {
    return DoctorModel(
      fullName: json['fullName'] ?? 'No Doctor Name',
      about: json['about'] ?? '',
      gender: json['gender'] ?? '',
      email: json['email'] ?? '',
      photoUrl: json['photoUrl'] ?? 'assets/images/doctor_image.png',
      yearsOfExperience: json['yearsOfExperience'] ?? 0,
      mainInstitutionId: json['mainInstitutionId'] ?? '',
      mainInstitutionName: json['mainInstitutionName'] ?? '',
      specialities: List<String>.from(
        json['specialities'] ?? ['No speciality'],
      ),
      id: json['id'] ?? '',
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'fullName': fullName,
      'about': about,
      'gender': gender,
      'email': email,
      'photoUrl': photoUrl,
      'yearsOfExperience': yearsOfExperience,
      'mainInstitutionId': mainInstitutionId,
      'mainInstitutionName': mainInstitutionName,
      'specialities': specialities,
      'id': id,
    };
  }
}
