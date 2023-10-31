import 'package:equatable/equatable.dart';

class DoctorFilterDomain extends Equatable {
  final String institutionId;
  final String experienceYears;
  final String educationalName;
  final List<String> specialities;

  DoctorFilterDomain({
    required this.institutionId,
    required this.experienceYears,
    required this.educationalName,
    required this.specialities,
  });

  @override
  List<Object?> get props =>
      [institutionId, experienceYears, educationalName, specialities];
}
