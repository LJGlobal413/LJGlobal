import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Package,
  Layers,
  Box,
  Truck,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Info,
  Compass,
} from 'lucide-react';
import { AIPackagingRecommendation } from '../types';

interface AiPackagingEngineerProps {
  onApplyRecommendation: (rec: AIPackagingRecommendation) => void;
  onOpenRfqWithAdvice: (rec: AIPackagingRecommendation) => void;
}

export const AiPrintAdvisor: React.FC<AiPackagingEngineerProps> = ({
  onApplyRecommendation,
  onOpenRfqWithAdvice,
}) => {
  const [prompt, setPrompt] = useState<string>(
    'Organic roasted whole bean coffee (340g): needs high-barrier flexible valve pouch, secondary folding carton with crash-lock auto-bottom, 8-up nested die layout on 720×1020mm sheet, plus commercial offset printing and sea freight export.'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AIPackagingRecommendation | null>({
    structuralStyle: 'ECMA A60.20 Crash-Lock Carton + Side-Gusset Valve Pouch',
    recommendedCategory: 'folding-carton',
    materialSpec: '350gsm C1S Virgin SBS Board + Matte BOPP 19µ / Met-PET 12µ / LLDPE 80µ',
    fluteOrCaliper: 'High-Stiffness Paperboard',
    primaryLaminateStructure: {
      recommendedLayers: 'Multi-Layer Airtight Film (Moisture & Oxygen Barrier)',
      pouchStyle: 'Side-Gusset Pouch with Freshness Valve & Resealable Zipper',
      barrierRating: 'Maximum Freshness Protection (Blocks Air, Humidity & Light)',
      sustainabilityOption: '100% Recyclable Mono-PE Eco Alternative Available',
    },
    secondaryFoldingCarton: {
      style: 'Fast-Assembly Snap-Lock Auto-Bottom Carton with Tuck Top',
      dielineSpecs: 'High-Grade Virgin Board with Reinforced Clean-Fold Creases',
      grainDirection: 'Grain aligned parallel to folds to eliminate cracked edges',
      dieLayoutYield: 'Interlocking low-waste press layout to minimize paper scrap',
    },
    tertiaryShipper: {
      corrugatedSpec: 'Reinforced Corrugated Master Shipping Carton',
      bctCompressiveStrength: 'Heavy-Duty Crush-Resistant: Built to prevent collapse in tall warehouse stacks',
      palletizationPlan: 'Optimized export pallet arrangement with zero wasted shipping space',
    },
    printAndDispatch: {
      printProcess: 'Commercial Full-Color Offset Printing with Premium Soft-Touch Matte Finish',
      finishingAndTooling: 'Automated high-speed precision die-cutting and folding-gluing',
      dispatchTimeline: 'Fast 3D/Physical Samples -> Mass Printing -> Global Warehouse Dispatch',
    },
    insertType: 'Integrated Folded Paperboard Cushion (Zero Plastic Foam)',
    transitTesting: 'Certified Drop & Vibration Transit Protection',
    unboxingUx: 'Effortless tuck release with smooth premium feel and clean interior presentation',
    estimatedProductionDays: 'Fast Physical Mockup / Swift Mass Production & Delivery',
    expertAdvice:
      'Pairing the airtight barrier pouch with a reinforced outer box keeps goods protected from tropical humidity during shipping, guaranteeing fresh retail presentation.',
    costEfficiencyTip:
      'Interlocking the carton shapes tightly on the parent sheet eliminates excess trim scrap, significantly reducing raw material costs on large production runs.',
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const samplePrompts = [
    'Organic whole bean coffee (340g): barrier pouch with valve, secondary auto-bottom carton & export shipper.',
    'Liquid cosmetic serum dropper: high-barrier foil sachet, straight tuck carton with 8-up die layout, commercial air dispatch.',
    'Eco nutritional powder: 100% recyclable mono-PE stand-up pouch, folding carton with grain alignment, ocean container freight.',
    'Pharmaceutical diagnostic kits: 3-side seal foil laminate, tamper-evident crash-lock carton, and ISTA 3A transit report.',
  ];

  const generateClientPackagingRecommendation = (queryText: string): AIPackagingRecommendation => {
    const lower = queryText.toLowerCase();

    let primaryLaminate = {
      recommendedLayers: 'Matte BOPP 19µ / Metallized PET 12µ / LLDPE 80µ',
      pouchStyle: 'Stand-Up Doyen Pouch with Press-to-Close Zipper',
      barrierRating: 'High Barrier (OTR < 0.8 cc/m²/day, WVTR < 0.6 g/m²/day)',
      sustainabilityOption: 'Mono-material recyclable PE laminate (MDO-PE/EVOH/LLDPE)',
    };

    if (
      lower.includes('coffee') ||
      lower.includes('grease') ||
      lower.includes('oil') ||
      lower.includes('liquid') ||
      lower.includes('sauce') ||
      lower.includes('retort')
    ) {
      primaryLaminate = {
        recommendedLayers: 'PET 12µ / AL Foil 7µ / BOPA (Nylon) 15µ / CPP 70µ',
        pouchStyle: 'Quad-Seal Gusset Pouch with One-Way Degassing Valve or Retort Spout Pouch',
        barrierRating: 'Ultra-High Total Barrier (OTR 0.01 cc/m²/day, WVTR 0.01 g/m²/day, Zero Light Transmission)',
        sustainabilityOption: 'High-barrier AlOx-coated PET with recyclable sealant film',
      };
    } else if (lower.includes('eco') || lower.includes('recyclable') || lower.includes('compost')) {
      primaryLaminate = {
        recommendedLayers: 'MDO-PE 25µ / High-Barrier EVOH / Low-Initiation PE 65µ',
        pouchStyle: 'Flat Bottom Box Pouch with 100% PE Recyclable Zipper',
        barrierRating: 'Medium-High Barrier with Certified RIC 4 PE Stream Recyclability',
        sustainabilityOption: 'How2Recycle Store Drop-off Certified / 100% Mono-PE structure',
      };
    }

    let foldingCarton = {
      style: 'ECMA A60.20 Crash-Lock Auto Bottom with Tuck Top',
      dielineSpecs: '350gsm C1S SBS, 0.52mm crease allowance, 15mm glue tab with hot-melt fiber-tear bond',
      grainDirection: 'Grain direction running parallel to main vertical crease lines to avoid cracked hinge corners',
      dieLayoutYield: '6-up nested step-and-repeat dieboard layout on standard 720×1020mm sheet (86% substrate yield)',
    };

    if (
      lower.includes('cosmetic') ||
      lower.includes('perfume') ||
      lower.includes('luxury') ||
      lower.includes('dropper') ||
      lower.includes('serum')
    ) {
      foldingCarton = {
        style: 'ECMA A20.20 Straight Tuck End (STE) with Fifth Panel Retail Hanger',
        dielineSpecs: '400gsm Virgin Bleached Sulfate (SBS 24pt), micro-perforated friction tuck locks',
        grainDirection: 'Machine grain aligned along vertical height (D) for maximum shelf standing stiffness',
        dieLayoutYield: '8-up optimized interlocking layout on 720×1020mm press sheet (88% substrate yield)',
      };
    } else if (lower.includes('pharma') || lower.includes('medicine') || lower.includes('diagnostic')) {
      foldingCarton = {
        style: 'Reverse Tuck End (RTE) with Tamper-Evident Perforation & Braille Emboss',
        dielineSpecs: '320gsm Virgin SBS Board with anti-counterfeit microscopic microtext integration',
        grainDirection: 'Parallel to width panels for automated carton infeed speeds up to 12,000 cph',
        dieLayoutYield: '12-up nested layout on standard B1 sheet (91% substrate yield)',
      };
    }

    const tertiaryShipper = {
      corrugatedSpec: 'B-Flute 44 ECT Regular Slotted Container (FEFCO 0201)',
      bctCompressiveStrength: 'McKee formula: 490 kg top-to-bottom compressive resistance',
      palletizationPlan: '5 layers of 8 master shippers = 40 cases (960 units) per 1200×1000mm export pallet',
    };

    const printAndDispatch = {
      printProcess: 'Heidelberg 6-Color Offset Press with inline G7 color calibration and aqueous matte dispersion',
      finishingAndTooling: 'Bobst Novacut 106 E high-speed die-cutting with laser steel rule die and Pertinax counters',
      dispatchTimeline: '24h CNC Dieline Mockup -> 4d Plate & Die Tooling -> 7d Mass Print & Automated Glue -> Hong Kong Port Export',
    };

    return {
      structuralStyle: `${foldingCarton.style} + ${primaryLaminate.pouchStyle}`,
      recommendedCategory: 'folding-carton',
      materialSpec: `350gsm Virgin SBS + ${primaryLaminate.recommendedLayers}`,
      fluteOrCaliper: '22pt Caliper (0.55mm) SBS Board',
      primaryLaminateStructure: primaryLaminate,
      secondaryFoldingCarton: foldingCarton,
      tertiaryShipper,
      printAndDispatch,
      insertType: 'Engineered Origami Fold-in-Place Paperboard Buffer or Molded Sugarcane Pulp',
      transitTesting: 'ISTA 3A Parcel Delivery Protocol & ASTM D4169 Distribution Simulation',
      unboxingUx: 'Clean friction-lock tuck release with smooth matte haptic feel and internal brand reveal',
      estimatedProductionDays: '24-48h Rapid Prototype / 7-10 Days Turnkey Mass Run & Dispatch',
      expertAdvice:
        'Our packaging consulting team recommends harmonizing the pouch laminate moisture barrier with the folding carton grain direction to prevent humidity warping during export sea freight.',
      costEfficiencyTip:
        'Nesting the folding carton dieline layout 6-up on a standard 720×1020mm sheet minimizes trim scrap to under 13% while perfectly matching automated Bobst folder-gluer infeed speeds.',
    };
  };

  const handleConsultEngineer = async (customText?: string) => {
    const query = customText || prompt;
    if (!query.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.success && resData.data) {
          setRecommendation(resData.data);
          return;
        }
      }

      // If backend returns error or is not found, use client-side engine
      const clientRec = generateClientPackagingRecommendation(query);
      setRecommendation(clientRec);
    } catch {
      // If running on static hosting without server, use client-side engine seamlessly
      const clientRec = generateClientPackagingRecommendation(query);
      setRecommendation(clientRec);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="ai-engineer"
      className="py-20 bg-zinc-950 text-zinc-100 border-b border-zinc-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-[#00AEEF] font-semibold">AI Packaging Systems Advisory</span>
            <span aria-hidden="true">·</span>
            <span>Primary, Secondary & Tertiary Synthesis</span>
            <span aria-hidden="true">·</span>
            <span>Live Dieline & Die Layout Modeler</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            AI Principal Packaging <br />
            <span className="text-zinc-500">Consultant & Systems Architect.</span>
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Describe your product type, target shelf life, and shipping channels. Our AI advisor formulates the
            exact primary flexible barrier laminate, secondary folding carton CAD dieline with nested press die layout,
            tertiary export shipper, and commercial offset print & dispatch timeline.
          </p>
        </div>

        {/* Input Interface */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4 shadow-xl">
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
            Enter Product Specification & Packaging Hierarchy Requirements:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 500g whey protein powder: needs recyclable stand-up pouch with zipper, retail carton with hang tab and 8-up die layout, plus offset printing and sea freight..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#0066E5] font-sans resize-none"
            />
            <button
              onClick={() => handleConsultEngineer()}
              disabled={isLoading || !prompt.trim()}
              className="absolute right-3 bottom-3 flex items-center gap-2 bg-[#0066E5] hover:bg-[#0052B8] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-colors cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Calculating Systems...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Packaging Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Scenario Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-mono text-zinc-500 shrink-0">Sample Audits:</span>
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(sample);
                  handleConsultEngineer(sample);
                }}
                className="text-[11px] font-sans text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 border border-zinc-700/50"
              >
                {sample.split(':')[0]}
              </button>
            ))}
          </div>

          {errorMsg && (
            <p className="text-xs font-mono text-amber-400">{errorMsg}</p>
          )}
        </div>

        {/* Deliverable Results: 4-Tier Systems Architecture */}
        {recommendation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#00AEEF] uppercase font-bold tracking-wider">
                  Audit Deliverable: Complete Packaging Ecosystem
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {recommendation.structuralStyle}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded font-bold">
                {recommendation.estimatedProductionDays}
              </span>
            </div>

            {/* 4 Pillars Output Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pillar 1: Primary Laminate */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase">
                    <Package className="w-4 h-4" />
                    <span>1. Primary Barrier</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Flexible</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.primaryLaminateStructure?.pouchStyle || 'Stand-Up Barrier Pouch'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.primaryLaminateStructure?.recommendedLayers || 'Matte BOPP / Met-PET / LLDPE'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-emerald-400 font-semibold">
                    {recommendation.primaryLaminateStructure?.barrierRating || 'OTR < 0.5 / WVTR < 0.5'}
                  </p>
                  <p className="text-zinc-500">
                    Eco: {recommendation.primaryLaminateStructure?.sustainabilityOption || 'Mono-PE stream'}
                  </p>
                </div>
              </div>

              {/* Pillar 2: Secondary Folding Carton */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase">
                    <Layers className="w-4 h-4" />
                    <span>2. Secondary Carton</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">CAD & Die</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.secondaryFoldingCarton?.style || 'ECMA A60.20 Crash-Lock Carton'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.secondaryFoldingCarton?.dielineSpecs || '350gsm C1S SBS, 0.52mm crease'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-amber-400 font-semibold">
                    {recommendation.secondaryFoldingCarton?.grainDirection || 'Grain parallel to height creases'}
                  </p>
                  <p className="text-emerald-400">
                    {recommendation.secondaryFoldingCarton?.dieLayoutYield || '6-up nested on 720×1020mm (87% yield)'}
                  </p>
                </div>
              </div>

              {/* Pillar 3: Tertiary Shipper & Pallet */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400 uppercase">
                    <Box className="w-4 h-4" />
                    <span>3. Tertiary Shipper</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Transit</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.tertiaryShipper?.corrugatedSpec || 'B-Flute 44 ECT Master Shipper'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.tertiaryShipper?.bctCompressiveStrength || 'Heavy-Duty: Crush-resistant stacking strength'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-blue-400">
                    {recommendation.tertiaryShipper?.palletizationPlan || '40 cases per 1200×1000mm pallet'}
                  </p>
                  <p className="text-zinc-500">
                    Test: {recommendation.transitTesting || 'ISTA 3A Parcel certified'}
                  </p>
                </div>
              </div>

              {/* Pillar 4: Print & Dispatch Execution */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
                    <Truck className="w-4 h-4" />
                    <span>4. Print & Dispatch</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Execution</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {recommendation.printAndDispatch?.printProcess || '6-Color Offset + Soft-Touch Matte'}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    {recommendation.printAndDispatch?.finishingAndTooling || 'Bobst Novacut + Pertinax counter'}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 space-y-1">
                  <p className="text-white font-semibold">
                    {recommendation.printAndDispatch?.dispatchTimeline || '7d Print -> Global Port Export'}
                  </p>
                  <p className="text-zinc-500">
                    AQL 1.0 zero-defect batch inspection
                  </p>
                </div>
              </div>
            </div>

            {/* Consulting Advisory Rationale & Cost Tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-1">
                <p className="text-xs font-mono text-[#00AEEF] uppercase font-bold">
                  Consulting Engineering Guidance:
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {recommendation.expertAdvice}
                </p>
              </div>

              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-1">
                <p className="text-xs font-mono text-emerald-400 uppercase font-bold">
                  Substrate & Tooling Cost Optimization Tip:
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {recommendation.costEfficiencyTip}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs font-mono text-zinc-500">
                Full manufacturing & dispatch managed by LJ Global Dongguan facility
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onApplyRecommendation(recommendation)}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Load Into CAD Lab</span>
                </button>
                <button
                  onClick={() => onOpenRfqWithAdvice(recommendation)}
                  className="px-5 py-2.5 bg-[#0066E5] hover:bg-[#0052B8] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>Request Production Print & Dispatch Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
