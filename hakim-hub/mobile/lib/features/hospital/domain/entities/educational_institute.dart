import 'package:equatable/equatable.dart';

class EductationalInstitutionDomain extends Equatable {
  final String institutionName;
  final String logoUrl;
  final String id;

  EductationalInstitutionDomain({
    required this.institutionName,
    required this.logoUrl,
    required this.id,
  });

  @override
  List<Object?> get props => [institutionName, logoUrl, id];

  toJson() {}
}
