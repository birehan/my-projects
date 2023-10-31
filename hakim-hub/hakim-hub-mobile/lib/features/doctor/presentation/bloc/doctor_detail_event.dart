part of 'doctor_detail_bloc.dart';

abstract class DoctorDetailEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class GetDoctorDetailEvent extends DoctorDetailEvent {
  final String doctorDetailId;

  GetDoctorDetailEvent({required this.doctorDetailId});
  @override
  List<Object?> get props => [doctorDetailId];
}
