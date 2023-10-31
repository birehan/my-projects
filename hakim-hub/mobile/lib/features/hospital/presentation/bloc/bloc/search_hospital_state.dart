part of 'search_hospital_bloc.dart';

abstract class SearchHospitalState extends Equatable {
  const SearchHospitalState();

  @override
  List<Object> get props => [];
}

class SearchHospitalInitial extends SearchHospitalState {}

class SearchHospitalSuccess extends SearchHospitalState {
  final List<InstitutionSearchDomain> institutionSearchDomain;
  const SearchHospitalSuccess({required this.institutionSearchDomain});

  @override
  List<Object> get props => [institutionSearchDomain];
}

class SearchHospitalError extends SearchHospitalState {
  final String message;
  const SearchHospitalError({required this.message});

  @override
  List<Object> get props => [message];
}

class SearchHospitalLoading extends SearchHospitalState {}