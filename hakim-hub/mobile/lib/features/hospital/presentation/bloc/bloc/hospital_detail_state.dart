part of 'hospital_detail_bloc.dart';

abstract class HospitalDetailState extends Equatable {
  const HospitalDetailState();

  @override
  List<Object> get props => [];
}

class HospitalDetailInitial extends HospitalDetailState {}

class DetailHospitalSuccess extends HospitalDetailState {
  final InstitutionDetailDomain institutionDetailDomain;
  const DetailHospitalSuccess({required this.institutionDetailDomain});

  @override
  List<Object> get props => [institutionDetailDomain];
}

class DetailHospitalError extends HospitalDetailState {
  final String message;
  const DetailHospitalError({required this.message});

  @override
  List<Object> get props => [message];
}

class DetailHospitalLoading extends HospitalDetailState {}
