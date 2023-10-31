import 'package:equatable/equatable.dart';

class InstitutionAvailabilityDomain extends Equatable {
  String startDay;
  String endDay;
  String opening;
  String closing;
  bool twentyFourHours;
  String id;

  InstitutionAvailabilityDomain({
    required this.startDay,
    required this.endDay,
    required this.opening,
    required this.closing,
    required this.twentyFourHours,
    required this.id,
  });

  @override
  List<Object?> get props => [startDay, endDay, opening, closing, twentyFourHours, id];

  toJson() {}
}