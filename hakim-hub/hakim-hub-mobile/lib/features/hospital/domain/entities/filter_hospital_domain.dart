import 'package:equatable/equatable.dart';

class FilterHospitalDomain extends Equatable {
  final bool openStatus;
  final int operationYears;
  final List<String> services;

  FilterHospitalDomain({
    required this.operationYears,
    required this.openStatus,
    required this.services,
  });

  @override
  List<Object?> get props => [openStatus, operationYears, services];
}
