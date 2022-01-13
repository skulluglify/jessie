import "./skeletons"


export class skJessieDocumentModule implements IskJessieDocumentModule {

    //? navigator.userAgent == 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'

    get elementAvailables(): Array<string> {

        /*
        * return ["video","unknown","ulist","track","title","time","textarea","template","tablesection","tablerow","table","tablecol","tablecell","tablecaption","style","span","source","slot","select","script","quote","progress","pre","picture","param","paragraph","output","option","optgroup","object","olist","mod","meter","meta","menu","media","marquee","map","link","legend","label","li","input","image","iframe","html","heading","head","hr","frameset","frame","form","font","fieldset","embed","div","directory","dialog","details","datalist","data","dlist","canvas","button","body","base","br","audio","area","anchor"]
        */
        
        return Array.from(Object.getOwnPropertyNames(globalThis))
        .filter((e) => e.startsWith("HTML") && e.endsWith("Element") && e.length > 11) // HTMLElement
        .map((e) => e.slice(4, e.length - 7).toLowerCase())
    }

    get styleAvailables(): Array<string> {

        /*
        * return ["accentColor","additiveSymbols","alignContent","alignItems","alignSelf","alignmentBaseline","all","animation","animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationTimingFunction","appRegion","appearance","ascentOverride","aspectRatio","backdropFilter","backfaceVisibility","background","backgroundAttachment","backgroundBlendMode","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPosition","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundRepeatX","backgroundRepeatY","backgroundSize","baselineShift","blockSize","border","borderBlock","borderBlockColor","borderBlockEnd","borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth","borderBlockStart","borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth","borderBlockStyle","borderBlockWidth","borderBottom","borderBottomColor","borderBottomLeftRadius","borderBottomRightRadius","borderBottomStyle","borderBottomWidth","borderCollapse","borderColor","borderEndEndRadius","borderEndStartRadius","borderImage","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderInline","borderInlineColor","borderInlineEnd","borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth","borderInlineStart","borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth","borderInlineStyle","borderInlineWidth","borderLeft","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRadius","borderRight","borderRightColor","borderRightStyle","borderRightWidth","borderSpacing","borderStartEndRadius","borderStartStartRadius","borderStyle","borderTop","borderTopColor","borderTopLeftRadius","borderTopRightRadius","borderTopStyle","borderTopWidth","borderWidth","bottom","boxShadow","boxSizing","breakAfter","breakBefore","breakInside","bufferedRendering","captionSide","caretColor","clear","clip","clipPath","clipRule","color","colorInterpolation","colorInterpolationFilters","colorRendering","colorScheme","columnCount","columnFill","columnGap","columnRule","columnRuleColor","columnRuleStyle","columnRuleWidth","columnSpan","columnWidth","columns","contain","containIntrinsicBlockSize","containIntrinsicHeight","containIntrinsicInlineSize","containIntrinsicSize","containIntrinsicWidth","content","contentVisibility","counterIncrement","counterReset","counterSet","cursor","cx","cy","d","descentOverride","direction","display","dominantBaseline","emptyCells","epubCaptionSide","epubTextCombine","epubTextEmphasis","epubTextEmphasisColor","epubTextEmphasisStyle","epubTextOrientation","epubTextTransform","epubWordBreak","epubWritingMode","fallback","fill","fillOpacity","fillRule","filter","flex","flexBasis","flexDirection","flexFlow","flexGrow","flexShrink","flexWrap","float","floodColor","floodOpacity","font","fontDisplay","fontFamily","fontFeatureSettings","fontKerning","fontOpticalSizing","fontSize","fontStretch","fontStyle","fontSynthesis","fontSynthesisSmallCaps","fontSynthesisStyle","fontSynthesisWeight","fontVariant","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariationSettings","fontWeight","forcedColorAdjust","gap","grid","gridArea","gridAutoColumns","gridAutoFlow","gridAutoRows","gridColumn","gridColumnEnd","gridColumnGap","gridColumnStart","gridGap","gridRow","gridRowEnd","gridRowGap","gridRowStart","gridTemplate","gridTemplateAreas","gridTemplateColumns","gridTemplateRows","height","hyphens","imageOrientation","imageRendering","inherits","initialValue","inlineSize","inset","insetBlock","insetBlockEnd","insetBlockStart","insetInline","insetInlineEnd","insetInlineStart","isolation","justifyContent","justifyItems","justifySelf","left","letterSpacing","lightingColor","lineBreak","lineGapOverride","lineHeight","listStyle","listStyleImage","listStylePosition","listStyleType","margin","marginBlock","marginBlockEnd","marginBlockStart","marginBottom","marginInline","marginInlineEnd","marginInlineStart","marginLeft","marginRight","marginTop","marker","markerEnd","markerMid","markerStart","mask","maskType","maxBlockSize","maxHeight","maxInlineSize","maxWidth","maxZoom","minBlockSize","minHeight","minInlineSize","minWidth","minZoom","mixBlendMode","negative","objectFit","objectPosition","offset","offsetDistance","offsetPath","offsetRotate","opacity","order","orientation","orphans","outline","outlineColor","outlineOffset","outlineStyle","outlineWidth","overflow","overflowAnchor","overflowClipMargin","overflowWrap","overflowX","overflowY","overscrollBehavior","overscrollBehaviorBlock","overscrollBehaviorInline","overscrollBehaviorX","overscrollBehaviorY","pad","padding","paddingBlock","paddingBlockEnd","paddingBlockStart","paddingBottom","paddingInline","paddingInlineEnd","paddingInlineStart","paddingLeft","paddingRight","paddingTop","page","pageBreakAfter","pageBreakBefore","pageBreakInside","pageOrientation","paintOrder","perspective","perspectiveOrigin","placeContent","placeItems","placeSelf","pointerEvents","position","prefix","quotes","r","range","resize","right","rowGap","rubyPosition","rx","ry","scrollBehavior","scrollMargin","scrollMarginBlock","scrollMarginBlockEnd","scrollMarginBlockStart","scrollMarginBottom","scrollMarginInline","scrollMarginInlineEnd","scrollMarginInlineStart","scrollMarginLeft","scrollMarginRight","scrollMarginTop","scrollPadding","scrollPaddingBlock","scrollPaddingBlockEnd","scrollPaddingBlockStart","scrollPaddingBottom","scrollPaddingInline","scrollPaddingInlineEnd","scrollPaddingInlineStart","scrollPaddingLeft","scrollPaddingRight","scrollPaddingTop","scrollSnapAlign","scrollSnapStop","scrollSnapType","scrollbarGutter","shapeImageThreshold","shapeMargin","shapeOutside","shapeRendering","size","sizeAdjust","speak","speakAs","src","stopColor","stopOpacity","stroke","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","suffix","symbols","syntax","system","tabSize","tableLayout","textAlign","textAlignLast","textAnchor","textCombineUpright","textDecoration","textDecorationColor","textDecorationLine","textDecorationSkipInk","textDecorationStyle","textDecorationThickness","textIndent","textOrientation","textOverflow","textRendering","textShadow","textSizeAdjust","textTransform","textUnderlineOffset","textUnderlinePosition","top","touchAction","transform","transformBox","transformOrigin","transformStyle","transition","transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction","unicodeBidi","unicodeRange","userSelect","userZoom","vectorEffect","verticalAlign","visibility","webkitAlignContent","webkitAlignItems","webkitAlignSelf","webkitAnimation","webkitAnimationDelay","webkitAnimationDirection","webkitAnimationDuration","webkitAnimationFillMode","webkitAnimationIterationCount","webkitAnimationName","webkitAnimationPlayState","webkitAnimationTimingFunction","webkitAppRegion","webkitAppearance","webkitBackfaceVisibility","webkitBackgroundClip","webkitBackgroundOrigin","webkitBackgroundSize","webkitBorderAfter","webkitBorderAfterColor","webkitBorderAfterStyle","webkitBorderAfterWidth","webkitBorderBefore","webkitBorderBeforeColor","webkitBorderBeforeStyle","webkitBorderBeforeWidth","webkitBorderBottomLeftRadius","webkitBorderBottomRightRadius","webkitBorderEnd","webkitBorderEndColor","webkitBorderEndStyle","webkitBorderEndWidth","webkitBorderHorizontalSpacing","webkitBorderImage","webkitBorderRadius","webkitBorderStart","webkitBorderStartColor","webkitBorderStartStyle","webkitBorderStartWidth","webkitBorderTopLeftRadius","webkitBorderTopRightRadius","webkitBorderVerticalSpacing","webkitBoxAlign","webkitBoxDecorationBreak","webkitBoxDirection","webkitBoxFlex","webkitBoxOrdinalGroup","webkitBoxOrient","webkitBoxPack","webkitBoxReflect","webkitBoxShadow","webkitBoxSizing","webkitClipPath","webkitColumnBreakAfter","webkitColumnBreakBefore","webkitColumnBreakInside","webkitColumnCount","webkitColumnGap","webkitColumnRule","webkitColumnRuleColor","webkitColumnRuleStyle","webkitColumnRuleWidth","webkitColumnSpan","webkitColumnWidth","webkitColumns","webkitFilter","webkitFlex","webkitFlexBasis","webkitFlexDirection","webkitFlexFlow","webkitFlexGrow","webkitFlexShrink","webkitFlexWrap","webkitFontFeatureSettings","webkitFontSmoothing","webkitHighlight","webkitHyphenateCharacter","webkitJustifyContent","webkitLineBreak","webkitLineClamp","webkitLocale","webkitLogicalHeight","webkitLogicalWidth","webkitMarginAfter","webkitMarginBefore","webkitMarginEnd","webkitMarginStart","webkitMask","webkitMaskBoxImage","webkitMaskBoxImageOutset","webkitMaskBoxImageRepeat","webkitMaskBoxImageSlice","webkitMaskBoxImageSource","webkitMaskBoxImageWidth","webkitMaskClip","webkitMaskComposite","webkitMaskImage","webkitMaskOrigin","webkitMaskPosition","webkitMaskPositionX","webkitMaskPositionY","webkitMaskRepeat","webkitMaskRepeatX","webkitMaskRepeatY","webkitMaskSize","webkitMaxLogicalHeight","webkitMaxLogicalWidth","webkitMinLogicalHeight","webkitMinLogicalWidth","webkitOpacity","webkitOrder","webkitPaddingAfter","webkitPaddingBefore","webkitPaddingEnd","webkitPaddingStart","webkitPerspective","webkitPerspectiveOrigin","webkitPerspectiveOriginX","webkitPerspectiveOriginY","webkitPrintColorAdjust","webkitRtlOrdering","webkitRubyPosition","webkitShapeImageThreshold","webkitShapeMargin","webkitShapeOutside","webkitTapHighlightColor","webkitTextCombine","webkitTextDecorationsInEffect","webkitTextEmphasis","webkitTextEmphasisColor","webkitTextEmphasisPosition","webkitTextEmphasisStyle","webkitTextFillColor","webkitTextOrientation","webkitTextSecurity","webkitTextSizeAdjust","webkitTextStroke","webkitTextStrokeColor","webkitTextStrokeWidth","webkitTransform","webkitTransformOrigin","webkitTransformOriginX","webkitTransformOriginY","webkitTransformOriginZ","webkitTransformStyle","webkitTransition","webkitTransitionDelay","webkitTransitionDuration","webkitTransitionProperty","webkitTransitionTimingFunction","webkitUserDrag","webkitUserModify","webkitUserSelect","webkitWritingMode","whiteSpace","widows","width","willChange","wordBreak","wordSpacing","wordWrap","writingMode","x","y","zIndex","zoom"]
        */

        return Array.from(Object.getOwnPropertyNames(document.createElement("unknown").style))
    }
}

class skJessieDocumentModuleTokenList extends Array<string> implements IskJessieDocumentModuleTokenList {
    
    [index: number]: string
    
    add(...tokens: Array<string>): void {
        
        let token: string

        for (token of tokens) {

            if (!this.includes(token)) {

                this.push(token)
            }

        }
    }
    
    contains(token: string): boolean {
    
        return this.includes(token)

    }
    
    item(index: number): string | null {
        
        if (0 <= index && index < this.length) {

            let value: string | undefined

            value = this.at(index)

            if (value) return value
        }

        return null

    }
    
    remove(...tokens: Array<string>): void {
        
        let token: string

        for (token of tokens) {

            let index: number

            index = this.indexOf(token)

            if (0 <= index) {

                this.splice(index, 1)
            }

        }

    }
    
    replace(token: string, newToken: string): boolean {
        
        let index: number

        index = this.indexOf(token)

        if (0 <= index) {

            this.splice(index, 1, newToken)
            return true
        }

        return false

    }
    
    supports(token: string): boolean {
        throw new Error("Method not implemented.")
    }
    
    toggle(token: string, force?: boolean): boolean {
        throw new Error("Method not implemented.")
    }
    
    entries(): IterableIterator<[number, string]> {
        throw new Error("Method not implemented.")
    }
    
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.")
    }
    
    values(): IterableIterator<string> {
        throw new Error("Method not implemented.")
    }
    
    [Symbol.iterator](): IterableIterator<string> {
        throw new Error("Method not implemented.")
    }
}

let skJessieElementStructure: IskJessieElementStructure;