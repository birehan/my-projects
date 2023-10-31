import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/ui_converter.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class GalleryTab extends StatelessWidget {
  List<String> images;
  GalleryTab({Key? key, required this.images}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(UIConverter.getComponentWidth(context, 16)),
      child: MasonryGridView.builder(
        itemCount: images.length,
        gridDelegate: const SliverSimpleGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2),
        itemBuilder: (context, index) => Padding(
          padding: EdgeInsets.symmetric(
            horizontal: UIConverter.getComponentWidth(context, 10),
            vertical: UIConverter.getComponentHeight(context, 10),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.network(
              images[index],
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
    );
  }
}