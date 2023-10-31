import 'package:equatable/equatable.dart';

class Experience extends Equatable {
  String title;
  String description;
  String institution;
  DateTime startDate;
  DateTime endDate;

  Experience({
    required this.title,
    required this.institution,
    required this.startDate,
    required this.endDate,
    required this.description,
  }) : super();

  @override
  List<Object> get props => [];
}
