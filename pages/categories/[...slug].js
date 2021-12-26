import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import product from "src/services/crud/products";
import ProductCard from "components/ProductCard";
import { FilterContext } from "src/helpers/FilterContext";
import FilterComponent from "components/FilterComponent";
import { ProductContext } from "src/helpers/ProductContext";
import handleViewport from "react-in-viewport";
import pages from "src/pages";

export async function getStaticPaths() {
  const paths = pages.map((page) => ({
    params: { slug: [page.id.toString(), page.pageName] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const result = pages.find((item) => item.id === Number(slug[0]));
  const products = await product.read(
    `/wc/v3/products?category=${slug[0]}&orderby=date&stock_status=instock&status=publish&per_page=1000`
  );
  return {
    props: { products: products.data, slug: slug[1].replace("-", " | ") },
  };
}

const specialBreakpoint = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  w100: {
    width: "100%",
  },
  container: {
    width: "auto",
    margin: 0,
  },
  dFlex: {
    display: "flex",
    [specialBreakpoint.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: "center",
  },
  loading: {
    margin: "auto",
    marginTop: theme.spacing(13),
    display: "flex",
  },
  loadMore: {
    display: "flex",
    margin: "30px auto",
  },
  infoText: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  gutter: {
    width: "100%",
    height: "80px",
  },
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionHolder: {
    marginBottom: theme.spacing(5),
  },
  description: {
    borderLeft: "1px solid #6e6e6e",
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      borderLeft: "none",
      paddingLeft: "0",
      marginTop: 20,
    },
  },
  viewPort: {
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    borderRadius: 0,
    width: "100%",
    height: "auto",
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const router = useRouter();
  const { products, slug } = props;
  const { filter, setFilter } = React.useContext(FilterContext);
  const { initialProducts, filtering, allProducts, filteredProducts } =
    React.useContext(ProductContext);
  const [showMoreLoading, setShowMoreLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(16);
  const [imagePath, setImagePath] = React.useState(null);

  const Block = (props) => {
    const { forwardedRef } = props;
    return (
      <div className={classes.viewPort} ref={forwardedRef}>
        {showMoreLoading && <CircularProgress size={40} disableShrink />}
      </div>
    );
  };
  const ViewportBlock = handleViewport(Block);

  const handleGoToTop = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const categoryDescription = {
    xWrap: {
      description:
        "کادوپیچ همواره یکی از عناصر ضروری برای زینت بخشی هدایاست. این محصول با طراحی منحصر به فرد، تنوع جنس و مناسب با رویدادهای ویژه می‌تواند ارزش دوچندانی به هدیه ببخشد.",
      pieces: 50,
    },
    xBox: {
      description:
        "این محصول انحصاری برند مریخ با تکنولوژی مدرن و طراحی ویژه در اندازه های مختلف تولید می‌شود. متال باکس ها با کاربری چندگانه و تکنیک های چاپی ویژه همچون متالایز، در بازار بی‌رقیب بوده وبرای همه‌ی سلایق ارائه می‌گردد.",
      pieces: 4,
    },
    xBag: {
      description:
        "که با نام های شاپینگ بگ و ساک دستی در بازار شناخته می‌شود، محصولی تکمیلی و زینت بخش برای بسته بندی هدایاست. این محصول در ابعاد و طرح های متنوع برای تمامی سنین و سلایق ارائه می‌شود؛ همچنین به دلیل کیفیت و دوام بالا قابلیت مصرف چندباره و کاربردی دراز مدت دارد.",
      pieces: 10,
    },
    xMemo: {
      description:
        "دفترچه های مریخ در شش سایز مختلف و برای یادداشت های روزانه، برای تمام سلایق و سنین، محصولی کاربردی است که تنوع طرح و رنگ در طراحی آنها، استفاده از آنها را لذتبخش تر کرده  است.",
      pieces: 5,
    },
    tissueBox: {
      description: null,
      pieces: 4,
    },
  };

  const checkSlug = () => {
    switch (slug) {
      case "X WRAP | کادوپیچ":
        return categoryDescription.xWrap;
      case "X BOX | باکس":
        return categoryDescription.xBox;
      case "X BAG | بگ":
        return categoryDescription.xBag;
      case "TISSUE BOX | باکس دستمال کاغذی":
        return categoryDescription.tissueBox;
      case "X MEMO | دفترچه":
        return categoryDescription.xMemo;
      default:
        return { description: null, pieces: null };
    }
  };

  const checkFilter = () => {
    if (
      filter.materials.length > 0 ||
      filter.sizes.length > 0 ||
      filter.style.length > 0 ||
      filter.usage.length > 0
    ) {
      return filteredProducts;
    } else {
      return allProducts;
    }
  };

  const getProductSizeGuide = (products) => {
    if (products.length > 0 && filter.sizes.length > 0) {
      const { sku } = products[0];
      console.log("sku", sku);
      const category = Number(sku.substr(1, 2));
      const type = Number(sku.substr(3, 2));
      const size = Number(sku.substr(5, 2));
      if (category === 1) {
        if (type <= 3) {
          setImagePath(`fantasy-xmemo/${size}.jpg`);
        } else {
          setImagePath(null);
        }
      } else if (category === 2) {
        if (type === 10 && getSkuRep(sku) !== 3) {
          setImagePath(`glossy-xbag/${size}.jpg`);
        } else if (type === 11) {
          setImagePath(`kraft-xbag/${size}.jpg`);
        } else {
          setImagePath(null);
        }
      } else if (category === 3) {
        setImagePath(`metal-box/${size}.jpg`);
      } else {
        setImagePath(null);
      }
    } else {
      setImagePath(null);
    }
  };

  const handleOffset = () => {
    setShowMoreLoading(true);
    setTimeout(() => {
      setShowMoreLoading(false);
      setOffset(offset + 16);
    }, 1000);
  };

  const isNew = (date) => {
    const now = new Date();
    const productCreatedTime = {
      day: Number(date.substr(8, 2)),
      month: Number(date.substr(5, 2)),
      year: Number(date.substr(0, 4)),
    };
    const currentTime = {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
    const current = new Date(
      `${currentTime.month}/${currentTime.day}/${currentTime.year}`
    );
    const product = new Date(
      `${productCreatedTime.month}/${productCreatedTime.day}/${productCreatedTime.year}`
    );
    const diffTime = Math.abs(current - product);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 31) {
      return true;
    } else {
      return false;
    }
  };

  const getSkuSize = (sku) => {
    return Number(sku.substr(5, 2));
  };

  const hasMaterial = (product, materials) => {
    return materials.some((material) => product.includes(material));
  };

  const hasSize = (sku, sizes) => {
    return sizes.some((size) => getSkuSize(sku) === size);
  };

  const hasAttribute = (attributes, filter, attributeName) => {
    const styleOptions = attributes.filter((attribute) => {
      return attribute.name === attributeName;
    });

    if (typeof styleOptions[0] !== "undefined") {
      return styleOptions[0].options.some((option) => filter.includes(option));
    } else {
      return false;
    }
  };

  const getFilterLength = () => {
    let count = 0;
    if (filter.materials.length > 0) {
      count++;
    }
    if (filter.sizes.length > 0) {
      count++;
    }
    if (filter.style.length > 0) {
      count++;
    }
    if (filter.usage.length > 0) {
      count++;
    }
    return count;
  };

  const count = (array_elements) => {
    const sortedArray = array_elements.sort((a, b) => {
      return a.sku - b.sku;
    });

    let result = [];

    let current = null;
    let cnt = 0;
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] !== current) {
        if (cnt >= getFilterLength()) {
          result.push(current);
        }
        current = sortedArray[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt >= getFilterLength()) {
      result.push(current);
    }
    return result;
  };

  const filterProducts = (data) => {
    let filteredMaterials = [];
    let filteredSizes = [];
    let filteredStyle = [];
    let filteredUsage = [];
    if (filter.materials.length > 0) {
      if (slug.includes("X MEMO | دفترچه")) {
        filteredMaterials = data.filter((product) => {
          return hasAttribute(product.attributes, filter.materials, "material");
        });
      } else {
        filteredMaterials = data.filter((product) => {
          return hasMaterial(product.name, filter.materials);
        });
      }
    }
    if (filter.sizes.length > 0) {
      filteredSizes = data.filter((product) => {
        return hasSize(product.sku, filter.sizes);
      });
    }
    if (filter.style.length > 0) {
      filteredStyle = data.filter((product) => {
        return hasAttribute(product.attributes, filter.style, "style");
      });
    }
    if (filter.usage.length > 0) {
      filteredUsage = data.filter((product) => {
        return hasAttribute(product.attributes, filter.usage, "usage");
      });
    }

    const finalFilter = filteredMaterials.concat(
      filteredSizes,
      filteredStyle,
      filteredUsage
    );

    filtering({ filtered: count(finalFilter) });
  };

  React.useEffect(() => {
    setOffset(16);
    handleGoToTop();
    initialProducts({ products: products });
    setImagePath(null);
  }, [slug]);

  React.useEffect(() => {
    const { material, size } = router.query;
    setFilter({
      materials: material ? [material] : [],
      sizes: size ? [Number(size)] : [],
      style: [],
      usage: [],
    });
  }, [allProducts]);

  React.useEffect(() => {
    setOffset(16);
    handleGoToTop();
    if (
      filter.materials.length > 0 ||
      filter.sizes.length > 0 ||
      filter.style.length > 0 ||
      filter.usage.length > 0
    )
      filterProducts(allProducts);
    setImagePath(null);
  }, [filter]);

  React.useEffect(() => {
    getProductSizeGuide(filteredProducts);
  }, [filteredProducts]);

  const CategoriesComponent = () => {
    return (
      <div className={classes.w100}>
        <FilterComponent slug={slug} />
        <Grid
          container
          className={products.length > 0 ? classes.container : classes.dFlex}
          spacing={2}
        >
          {checkFilter().length > 0 ? (
            checkFilter()
              .slice(0, offset)
              .map((pr, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    key={index}
                    className={classes.dFlex}
                  >
                    <ProductCard
                      image={pr.images}
                      title={pr.name}
                      key={index}
                      id={pr.id}
                      sku={pr.sku}
                      stock={pr.stock_quantity}
                      new={isNew(pr.date_created)}
                      pieces={checkSlug().pieces}
                    />
                  </Grid>
                );
              })
          ) : (
            <Typography
              variant="body1"
              component="p"
              className={classes.infoText}
            >
              محصولی یافت نشد
            </Typography>
          )}
        </Grid>
        {checkFilter().length > 0 && offset < checkFilter().length ? (
          <ViewportBlock onEnterViewport={handleOffset} />
        ) : (
          <div className={classes.gutter}></div>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>شرکت مریخ (لوتوس) - {slug}</title>
      </Head>
      <React.Fragment>
        <Container maxWidth="lg" className={classes.descriptionHolder}>
          {imagePath !== null && (
            <Typography variant="h5" component="h1" className={classes.title}>
              {slug}
            </Typography>
          )}
          <Grid
            container
            className={classes.container}
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={checkSlug().description !== null ? 6 : 12}>
              {imagePath !== null ? (
                <Avatar
                  alt="guide"
                  src={`/${imagePath}`}
                  className={classes.square}
                />
              ) : (
                <Typography
                  variant="h5"
                  component="h1"
                  className={classes.title}
                >
                  {slug}
                </Typography>
              )}
            </Grid>
            {checkSlug().description !== null && (
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.description}
                  align="justify"
                >
                  {checkSlug().description}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>

        <Container maxWidth="lg">
          <Grid container className={classes.container} spacing={2}>
            <CategoriesComponent />
          </Grid>
        </Container>
      </React.Fragment>
    </>
  );
}
