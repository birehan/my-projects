part of 'hospital_detail_bloc.dart';

abstract class HospitalDetailEvent extends Equatable {
  const HospitalDetailEvent();

  @override
  List<Object> get props => [];
}


class DoctorFilterEvent extends HospitalDetailEvent {
  final DoctorFilterDomain filter;
  InstitutionDetailDomain institutionDetailDomain;
  DoctorFilterEvent({required this.filter, required this.institutionDetailDomain } );

  @override
  List<Object> get props => [filter];
}

class HospitalDetailGetEvent extends HospitalDetailEvent {
  final String id;

  const HospitalDetailGetEvent({required this.id});

  @override
  List<Object> get props => [id];
}
  
