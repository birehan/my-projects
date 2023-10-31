part of 'search_hospital_bloc.dart';

abstract class SearchHospitalEvent extends Equatable {
  const SearchHospitalEvent();

  @override
  List<Object> get props => [];
}

class HospitalSearchByFilterEvent extends SearchHospitalEvent {
  final FilterHospitalDomain filter;

  const HospitalSearchByFilterEvent({required this.filter});

  @override
  List<Object> get props => [filter];
}

class HospitalSearchByNameEvent extends SearchHospitalEvent {
  final String name;

  const HospitalSearchByNameEvent({required this.name});

  @override
  List<Object> get props => [name];
}

class GetAllHospitalsEvent extends SearchHospitalEvent {
  const GetAllHospitalsEvent();

  @override
  List<Object> get props => [];
}
