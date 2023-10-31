import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:latlong2/latlong.dart';

class MapBoxWidget extends StatefulWidget {
  final double latitude;
  final double longitude;

  const MapBoxWidget({
    Key? key,
    required this.latitude,
    required this.longitude,
  }) : super(key: key);

  @override
  _MapBoxWidgetState createState() => _MapBoxWidgetState();
}

class _MapBoxWidgetState extends State<MapBoxWidget> {
  MapController mapController = MapController();

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        FlutterMap(
          mapController: mapController,
          options: MapOptions(
            minZoom: 5,
            maxZoom: 18,
            zoom: 13,
            center: LatLng(widget.latitude, widget.longitude),
            interactiveFlags: 0, // disable all gestures
          ),
          layers: [
            TileLayerOptions(
              urlTemplate:
                  "https://api.mapbox.com/styles/v1/fenetshewarega/cljgsjqhs00cj01pi5bw22hfz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmVuZXRzaGV3YXJlZ2EiLCJhIjoiY2xqY2k2ajhpMDFjajNlbW9lbTJvdmozeiJ9.6xeUCiBbQYWVIEzFBT9kPA",
              additionalOptions: {
                'accessToken':
                    "pk.eyJ1IjoiZmVuZXRzaGV3YXJlZ2EiLCJhIjoiY2xqY2k2ajhpMDFjajNlbW9lbTJvdmozeiJ9.6xeUCiBbQYWVIEzFBT9kPA",
                'mapStyleId':
                    "mapbox://styles/fenetshewarega/cljgsjqhs00cj01pi5bw22hfz",
              },
            ),
            MarkerLayerOptions(
              markers: [
                Marker(
                  point: LatLng(widget.latitude, widget.longitude),
                  builder: (ctx) => Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(50),
                      color: Colors.white.withOpacity(0.5),
                    ),
                    child: Icon(
                      Icons.location_on_rounded,
                      color: redColor,
                    ),
                    // color: Colors.red,
                  ),
                ),
              ],
            ),
          ],
        ),
        Positioned(
          top: 16,
          right: 16,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.white,
                ),
              ),
              IconButton(
                icon: Icon(Icons.add),
                onPressed: () {
                  mapController.move(
                      mapController.center, mapController.zoom + 1);
                },
              ),
            ],
          ),
        ),
        Positioned(
          top: 72,
          right: 16,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.white,
                ),
              ),
              IconButton(
                icon: Icon(Icons.remove),
                onPressed: () {
                  mapController.move(
                      mapController.center, mapController.zoom - 1);
                },
              ),
            ],
          ),
        ),
      ],
    );
  }
}
