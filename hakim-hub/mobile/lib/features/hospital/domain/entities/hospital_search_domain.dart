import 'package:equatable/equatable.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_address_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_availability_domain.dart';

class InstitutionSearchDomain extends Equatable {
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
  String id;

  InstitutionSearchDomain({
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
    required this.id,
  });

  @override
  List<Object?> get props => [
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
        id,
      ];
}
