import 'package:equatable/equatable.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/educational_institute.dart';

import 'hospital_address_domain.dart';
import 'hospital_availability_domain.dart';
import 'hospital_doctor_domain.dart';

class InstitutionDetailDomain extends Equatable {
  List<EductationalInstitutionDomain> educationalInstitutions;
  String institutionName;
  String branchName;
  String website;
  String phoneNumber;
  String summary;
  DateTime establishedOn;
  double rate;
  String status;
  String logoUrl;
  String bannerUrl;
  InstitutionAvailabilityDomain institutionAvailability;
  AddressDomain address;
  List<String> services;
  List<String> photos;
  List<DoctorDomain> doctors;
  String id;
  List<String> allSpecialities;

  InstitutionDetailDomain({
    required this.allSpecialities,
    required this.educationalInstitutions,
    required this.institutionName,
    required this.branchName,
    required this.website,
    required this.phoneNumber,
    required this.summary,
    required this.establishedOn,
    required this.rate,
    required this.status,
    required this.logoUrl,
    required this.bannerUrl,
    required this.institutionAvailability,
    required this.address,
    required this.services,
    required this.photos,
    required this.doctors,
    required this.id,
  });

  @override
  List<Object?> get props => [
        educationalInstitutions,
        institutionName,
        branchName,
        website,
        phoneNumber,
        summary,
        establishedOn,
        rate,
        status,
        logoUrl,
        bannerUrl,
        institutionAvailability,
        address,
        services,
        photos,
        doctors,
        id,
        allSpecialities,
      ];
}
