import 'package:equatable/equatable.dart';

class AddressDomain extends Equatable {
  final String country;
  final String region;
  final String zone;
  final String woreda;
  final String city;
  final String subCity;
  final double longitude;
  final double latitude;
  final String summary;
  final String id;

  AddressDomain({
    required this.country,
    required this.region,
    required this.zone,
    required this.woreda,
    required this.city,
    required this.subCity,
    required this.longitude,
    required this.latitude,
    required this.summary,
    required this.id,
  });

  @override
  List<Object?> get props => [
        country,
        region,
        zone,
        woreda,
        city,
        subCity,
        longitude,
        latitude,
        summary,
        id
      ];

  toJson() {}
}
