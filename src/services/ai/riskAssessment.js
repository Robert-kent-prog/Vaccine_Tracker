// src/services/ai/riskAssessment.js
import { predictiveAnalytics } from './predictiveAnalytics';

export const riskAssessment = {
  // Assess defaulter risk for a child
  assessDefaulterRisk: (childData, historicalData, communityFactors) => {
    const baseRiskScore = predictiveAnalytics.predictDefaultRisk(
      childData,
      historicalData,
      communityFactors
    );

    const riskFactors = identifyRiskFactors(childData, historicalData, communityFactors);
    const mitigationFactors = identifyMitigationFactors(childData, communityFactors);

    const adjustedRiskScore = calculateAdjustedRiskScore(
      baseRiskScore,
      riskFactors,
      mitigationFactors
    );

    return {
      riskScore: adjustedRiskScore,
      riskLevel: getRiskLevel(adjustedRiskScore),
      riskFactors,
      mitigationFactors,
      recommendations: generateRecommendations(adjustedRiskScore, riskFactors)
    };
  },

  // Assess stock-out risk for vaccines
  assessStockRisk: (vaccineData, consumptionRate, supplyChainData) => {
    const daysOfSupply = vaccineData.currentStock / (consumptionRate / 30); // Convert monthly to daily
    const supplyChainRisk = assessSupplyChainRisk(supplyChainData);
    
    const riskScore = calculateStockRiskScore(daysOfSupply, supplyChainRisk);
    
    return {
      riskScore,
      riskLevel: getStockRiskLevel(riskScore),
      daysOfSupply: Math.round(daysOfSupply),
      criticality: getStockCriticality(vaccineData, consumptionRate),
      recommendations: generateStockRecommendations(daysOfSupply, supplyChainRisk)
    };
  },

  // Assess coverage gap risks
  assessCoverageRisk: (coverageData, populationData, historicalTrends) => {
    const gapAnalysis = analyzeCoverageGaps(coverageData, populationData);
    const trendRisk = assessTrendRisk(historicalTrends);
    const outbreakRisk = calculateOutbreakRisk(coverageData, populationData);

    return {
      overallRisk: Math.max(gapAnalysis.risk, trendRisk, outbreakRisk),
      gapAnalysis,
      trendRisk,
      outbreakRisk,
      priorityAreas: identifyPriorityAreas(gapAnalysis, outbreakRisk),
      interventions: recommendInterventions(gapAnalysis, trendRisk, outbreakRisk)
    };
  }
};

// Helper functions
function identifyRiskFactors(childData, historicalData, communityFactors) {
  const factors = [];

  // Previous default history
  if (historicalData.missedVaccinations > 0) {
    factors.push({
      factor: 'Previous defaults',
      severity: historicalData.missedVaccinations > 2 ? 'high' : 'medium',
      description: `Missed ${historicalData.missedVaccinations} previous vaccinations`
    });
  }

  // Geographic factors
  if (communityFactors.distanceToFacility > 10) {
    factors.push({
      factor: 'Distance to facility',
      severity: 'medium',
      description: `Lives ${communityFactors.distanceToFacility}km from nearest health facility`
    });
  }

  // Socioeconomic factors
  if (communityFactors.socioeconomicStatus === 'low') {
    factors.push({
      factor: 'Socioeconomic status',
      severity: 'medium',
      description: 'Comes from low-income household'
    });
  }

  // Maternal factors
  if (childData.motherAge < 20) {
    factors.push({
      factor: 'Young mother',
      severity: 'low',
      description: 'Mother is under 20 years old'
    });
  }

  // Seasonal factors
  const currentSeason = getCurrentSeason();
  if (currentSeason === 'rainy') {
    factors.push({
      factor: 'Seasonal challenges',
      severity: 'low',
      description: 'Rainy season may affect travel to facility'
    });
  }

  return factors;
}

function identifyMitigationFactors(childData, communityFactors) {
  const factors = [];

  // CHW support
  if (communityFactors.chwSupport) {
    factors.push({
      factor: 'CHW Support',
      strength: 'high',
      description: 'Regular follow-up by community health worker'
    });
  }

  // Mother's education
  if (communityFactors.motherEducation === 'secondary' || communityFactors.motherEducation === 'tertiary') {
    factors.push({
      factor: 'Mother education',
      strength: 'medium',
      description: 'Mother has secondary or higher education'
    });
  }

  // Previous compliance
  if (childData.previousComplianceRate > 0.8) {
    factors.push({
      factor: 'Good compliance history',
      strength: 'high',
      description: 'Good track record of vaccination compliance'
    });
  }

  return factors;
}

function calculateAdjustedRiskScore(baseScore, riskFactors, mitigationFactors) {
  let adjustment = 0;

  // Apply risk factor penalties
  riskFactors.forEach(factor => {
    if (factor.severity === 'high') adjustment += 15;
    else if (factor.severity === 'medium') adjustment += 10;
    else adjustment += 5;
  });

  // Apply mitigation factor bonuses
  mitigationFactors.forEach(factor => {
    if (factor.strength === 'high') adjustment -= 20;
    else if (factor.strength === 'medium') adjustment -= 10;
    else adjustment -= 5;
  });

  return Math.max(0, Math.min(100, baseScore + adjustment));
}

function getRiskLevel(score) {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

function generateRecommendations(riskScore, riskFactors) {
  const recommendations = [];

  if (riskScore >= 70) {
    recommendations.push({
      priority: 'high',
      action: 'Immediate home visit required',
      timeline: 'Within 24 hours'
    });
  }

  if (riskScore >= 40) {
    recommendations.push({
      priority: 'medium',
      action: 'Schedule follow-up call',
      timeline: 'Within 3 days'
    });
  }

  // Specific recommendations based on risk factors
  riskFactors.forEach(factor => {
    if (factor.factor === 'Distance to facility') {
      recommendations.push({
        priority: 'medium',
        action: 'Coordinate with mobile vaccination clinic',
        timeline: 'Next scheduled visit'
      });
    }

    if (factor.factor === 'Previous defaults') {
      recommendations.push({
        priority: 'high',
        action: 'Intensive follow-up and counseling',
        timeline: 'Immediate'
      });
    }
  });

  return recommendations;
}

function assessSupplyChainRisk(supplyChainData) {
  let riskScore = 0;

  if (supplyChainData.leadTime > 30) riskScore += 30;
  if (supplyChainData.reliability < 0.8) riskScore += 25;
  if (supplyChainData.weatherImpact) riskScore += 20;
  if (supplyChainData.politicalStability < 0.7) riskScore += 25;

  return Math.min(100, riskScore);
}

function calculateStockRiskScore(daysOfSupply, supplyChainRisk) {
  let score = 0;

  if (daysOfSupply < 7) score += 70;
  else if (daysOfSupply < 14) score += 40;
  else if (daysOfSupply < 30) score += 20;

  // Adjust for supply chain risk
  score += (supplyChainRisk * 0.3);

  return Math.min(100, score);
}

function getStockRiskLevel(score) {
  if (score >= 60) return 'critical';
  if (score >= 40) return 'high';
  if (score >= 20) return 'medium';
  return 'low';
}

function getStockCriticality(vaccineData, consumptionRate) {
  const essentialVaccines = ['BCG', 'OPV', 'Pentavalent'];
  const isEssential = essentialVaccines.includes(vaccineData.name);
  
  if (isEssential && consumptionRate > 50) return 'very-high';
  if (isEssential) return 'high';
  if (consumptionRate > 30) return 'medium';
  return 'low';
}

function generateStockRecommendations(daysOfSupply, supplyChainRisk) {
  const recommendations = [];

  if (daysOfSupply < 7) {
    recommendations.push({
      priority: 'critical',
      action: 'Emergency order required',
      timeline: 'Immediate'
    });
  }

  if (daysOfSupply < 14) {
    recommendations.push({
      priority: 'high',
      action: 'Expedite next shipment',
      timeline: 'Within 3 days'
    });
  }

  if (supplyChainRisk > 50) {
    recommendations.push({
      priority: 'medium',
      action: 'Identify alternative suppliers',
      timeline: 'Within 1 week'
    });
  }

  return recommendations;
}

function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 3 && month <= 5) return 'rainy';
  if (month >= 6 && month <= 8) return 'cold';
  return 'dry';
}