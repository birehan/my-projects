import 'package:equatable/equatable.dart';

class Education extends Equatable {
  String degree;
  String institution;
  DateTime startDate;
  DateTime endDate;
  String fieldOfStudy;
  String logoUrl;

  Education({
    required this.degree,
    required this.institution,
    required this.startDate,
    required this.endDate,
    required this.fieldOfStudy,
    required this.logoUrl,
  }) : super();

  @override
  List<Object> get props => [];
}
