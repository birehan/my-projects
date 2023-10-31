import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';

class DoctorFilterModel extends DoctorFilterDomain {
  String institutionId;
  String experienceYears;
  String educationalName;
  List<String> specialities;

  DoctorFilterModel({
    required this.institutionId,
    required this.experienceYears,
    required this.educationalName,
    required this.specialities,
  }) : super(
            educationalName: educationalName,
            experienceYears: experienceYears,
            specialities: specialities,
            institutionId: institutionId);
  Map<String, dynamic> toJson() {
    return {
      'institutionId': institutionId,
      'experienceYears': experienceYears,
      'educationalName': educationalName,
      'specialities': specialities,
    };
  }
}
