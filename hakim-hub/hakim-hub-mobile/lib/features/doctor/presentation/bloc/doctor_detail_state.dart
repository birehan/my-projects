part of 'doctor_detail_bloc.dart';

abstract class DoctorDetailState extends Equatable {
  const DoctorDetailState();

  @override
  List<Object?> get props => [];
}

class DoctorDetailInitialState extends DoctorDetailState {}

class DoctorDetailLoadingState extends DoctorDetailState {}

class DoctorDetailSuccessState extends DoctorDetailState {
  final DoctorDetail doctorDetail;
  const DoctorDetailSuccessState({required this.doctorDetail});

  @override
  List<Object?> get props => [doctorDetail];
}

class DoctorDetailFailureState extends DoctorDetailState {
  final Failure error;

  const DoctorDetailFailureState({required this.error});
  @override
  List<Object?> get props => [error];
}
