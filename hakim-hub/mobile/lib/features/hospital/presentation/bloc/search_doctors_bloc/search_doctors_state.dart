import 'package:equatable/equatable.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';

abstract class SearchBarState extends Equatable {
  final List<DoctorDomain> filteredDoctors;
  SearchBarState(this.filteredDoctors);
}

class SearchInitial extends SearchBarState {
  SearchInitial(super.filteredDoctors);

  @override
  List<Object?> get props => [filteredDoctors];
}

class SearchSuccess extends SearchBarState {
  SearchSuccess(super.filteredDoctors);

  @override
  List<Object?> get props => [filteredDoctors];
}

class SearchError extends SearchBarState {
  final String error;

  SearchError(this.error, super.filteredDoctors);

  @override
  List<Object?> get props => [error, filteredDoctors];
}
