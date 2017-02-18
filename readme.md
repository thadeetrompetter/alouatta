# Alouatta [![Build Status](https://travis-ci.org/thadeetrompetter/alouatta.svg?branch=master)](https://travis-ci.org/thadeetrompetter/alouatta)

## How to

### Add images

You can add responsive images by writing an image tag with adjusted
markdown sytax. Using responsive images means that visitors will be served the
image size that is optimal for their viewport.

```markdown
![image alt text](/assets/gallery/images/tumblr_m6cgmuUzOX1qkag6bo1_500.jpg:100w "image title:position")
```

#### srcset
Specify multiple, comma separated image sources. The sources you specify will
be put in a `srcset` attribute on the image. The first image url you specify
will go into a src attribute as fallback. e.g:

```markdown
![image alt text](/image1.jpg:100w,/image2.jpg:200w,/image3.jpg:300w "image title")
```
#### orientation
To align the image, you specify classnames you want to add to the image tag.
Do this where you specify image title (after the image sources). Separate the
classnames from the actual image title with a colon `:` and, if you want
multiple classnames, separate the classnames with a comma `,`. e.g:

```markdown
![image alt text](/image1.jpg:100w "image title:left,right,center,other")
```

Available layout classnames:

* `left`: float the image to the left, text wraps around to the right.
* `right`: float the image to the right, text wraps around to the left.
* `center`: center the image with `display: block` and `margin: 0 auto`.
