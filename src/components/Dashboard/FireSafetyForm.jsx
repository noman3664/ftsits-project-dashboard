import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import './FireSafetyForm.css';

export default function FireSafetyForm() {
    const [fireAlarmRows, setFireAlarmRows] = useState([
        { item: 'Control Panels', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Smoke Detectors', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Heat Detectors', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Manual Call Points', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Sounders / Flashers', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'FACP Batteries & charger', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Sounder quality', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [fireEquipmentRows, setFireEquipmentRows] = useState([
        { item: 'Fire Extinguishers', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Hose Reels', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Landing Valves', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Sprinklers', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Valves', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Paint', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Water flow Switches', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Tamper Switches', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [fm200Rows, setFm200Rows] = useState([
        { item: 'Cylinders', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Nozzles', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Control Panels', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [foamRows, setFoamRows] = useState([
        { item: 'Foam Tanks', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Proportions', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Piping/Valves', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Paint', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [voiceEvacRows, setVoiceEvacRows] = useState([
        { item: 'Speakers', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Message Controllers', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Panel', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [emergencyLightRows, setEmergencyLightRows] = useState([
        { item: 'Emergency Lights (30 mins check on battery)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Exit Lights', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Panel (If app)', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [interfaceRows, setInterfaceRows] = useState([
        { interface: 'Lift Interface', status: 'Working', urgent: 'No', remarks: '' },
        { interface: 'Gas Detection Panels', status: 'Working', urgent: 'No', remarks: '' },
        { interface: 'Ventilation / FAHU', status: 'Shuts Down on Alarm', urgent: 'No', remarks: '' },
        { interface: 'Doors / Magnetic Locks', status: 'Release on Alarm', urgent: 'No', remarks: '' },
        { interface: 'Other FACP Interface', status: 'Working', urgent: 'No', remarks: '' },
        { interface: 'Repeaters/ Others', status: 'Working', urgent: 'No', remarks: '' }
    ]);

    const [exitRouteRows, setExitRouteRows] = useState([
        { item: 'Exit Routes Clear', status: '', urgent: 'No', remarks: '' },
        { item: 'Emergency Exit Doors Functional', status: '', urgent: 'No', remarks: '' },
        { item: 'Signage Visible and Illuminated', status: '', urgent: 'No', remarks: '' },
        { item: 'Storage Near Equipment', status: '', urgent: 'No', remarks: '' }
    ]);

    const [storageRows, setStorageRows] = useState([
        { area: 'Equipment Rooms', status: '', urgent: 'No', check: false, remarks: '' },
        { area: 'Fire Pump Room', status: '', urgent: 'No', check: false, remarks: '' },
        { area: 'Electrical Rooms', status: '', urgent: 'No', check: false, remarks: '' },
        { area: 'Egress Paths', status: '', urgent: 'No', check: false, remarks: '' }
    ]);

    const [pumpRows, setPumpRows] = useState([
        { item: 'Jockey Pump -- Auto Run', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Electric Pump -- Auto Run', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Diesel Pump -- Auto Run', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Pipeline Leakages (Pump Room / Hose Reels / Hydrants)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Fire Pump Controllers', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Sensor Lines', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Diesel Level in Tank', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Oil Level / Air & Oil Filters', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Coolant Level', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Rust on Pumps / Seal Check', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Support Brackets & Joints', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Pressure Gauges', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Batteries', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Charger', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Pump Base, Alignment, Paint', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Pump Room Cleanliness', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Exhaust System & ventilation', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Leakage', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Interfaced with FACP', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Alarm Indications, Pump Run, Power failure, Low fuel, Phase Failure, Battery Charger', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Model Number & Photos', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [delugeRows, setDelugeRows] = useState([
        { item: 'Deluge Valves (Body & Trim)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Detection Devices (e.g., heat/smoke sensors)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Actuation Mechanism (manual/electric/pneumatic)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Control Valves (isolation/inlet/outlet)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Pressure Gauges', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Gasket & Accessories', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Strainers / Filters', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Spray Nozzles / Open Sprinkler Heads', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Drain Valves', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Main Drain Flow (Tested)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Alarms / Supervisory Devices', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'System Reset Function (Post-Test)', totalQty: '', damaged: '', urgent: 'No', remarks: '' },
        { item: 'Electrical Control Panel (if applicable)', totalQty: '', damaged: '', urgent: 'No', remarks: '' }
    ]);

    const [urgentIssues, setUrgentIssues] = useState([
        { issue: '', location: '', action: '', deadline: '' }
    ]);

    const addRow = (setter, template) => {
        setter(prev => [...prev, { ...template }]);
    };

    const removeRow = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    const updateRow = (setter, index, field, value) => {
        setter(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
    };

   const handleSubmit = () => {
    const formData = {
        fireAlarm: fireAlarmRows,
        fireEquipment: fireEquipmentRows,
        fm200: fm200Rows,
        foam: foamRows,
        voiceEvac: voiceEvacRows,
        emergencyLight: emergencyLightRows,
        interfaces: interfaceRows,
        exitRoutes: exitRouteRows,
        storage: storageRows,
        pump: pumpRows,
        deluge: delugeRows,
        urgentIssues: urgentIssues
    };
    
    console.log('All Form Data:', formData);
    // Send to API or process further
};

    const renderTable = (title, rows, setter, template, hasStatus = false, hasCheck = false) => (
        <div className="mb-8">
            <h3 className="section-title text-gray-800">{title}</h3>
            <div className="table-container">
                <table className="data-table">
                    <thead className="table-header">
                        <tr>
                            <th className="table-cell">Item/Interface/Area</th>
                            {hasStatus ? (
                                <th className="table-cell">Status</th>
                            ) : (
                                <>
                                    <th className="table-cell">Total Qty</th>
                                    <th className="table-cell">Qty Damaged/Defective</th>
                                </>
                            )}
                            <th className="table-cell">Urgent Action Required</th>
                            {hasCheck && <th className="table-cell">Check</th>}
                            <th className="table-cell">Remarks</th>
                            <th className="table-cell w-16">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="table-cell">
                                    <input
                                        type="text"
                                        value={row.item || row.interface || row.area}
                                        onChange={(e) => updateRow(setter, index, row.item ? 'item' : row.interface ? 'interface' : 'area', e.target.value)}
                                        className="table-input"
                                    />
                                </td>
                                {hasStatus ? (
                                    <td className="table-cell">
                                        <input
                                            type="text"
                                            value={row.status}
                                            onChange={(e) => updateRow(setter, index, 'status', e.target.value)}
                                            className="table-input"
                                        />
                                    </td>
                                ) : (
                                    <>
                                        <td className="table-cell">
                                            <input
                                                type="text"
                                                value={row.totalQty}
                                                onChange={(e) => updateRow(setter, index, 'totalQty', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="table-cell">
                                            <input
                                                type="text"
                                                value={row.damaged}
                                                onChange={(e) => updateRow(setter, index, 'damaged', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                    </>
                                )}
                                <td className="table-cell">
                                    <select
                                        value={row.urgent}
                                        onChange={(e) => updateRow(setter, index, 'urgent', e.target.value)}
                                        className="table-input"
                                    >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </td>
                                {hasCheck && (
                                    <td className="table-cell text-center">
                                        <input
                                            type="checkbox"
                                            checked={row.check}
                                            onChange={(e) => updateRow(setter, index, 'check', e.target.checked)}
                                            className="w-5 h-5"
                                        />
                                    </td>
                                )}
                                <td className="table-cell">
                                    <input
                                        type="text"
                                        value={row.remarks}
                                        onChange={(e) => updateRow(setter, index, 'remarks', e.target.value)}
                                        className="table-input"
                                    />
                                </td>
                                <td className="table-cell text-center">
                                    <button
                                        onClick={() => removeRow(setter, index)}
                                        className="btn-danger"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => addRow(setter, template)}
                className="btn-add"
            >
                <Plus size={18} /> Add New Row
            </button>
        </div>
    );

    return (
        <div className="form-container">
            <div className="form-wrapper">
                {/* Header */}
                <div className="form-header">
                    <div className="flex justify-between items-center mb-4">
                        <div className="company-info">
                            <h1 className="text-xl font-bold text-orange-600">Fire Technical Services</h1>
                            <p className="text-sm">RAS AL KHAIMAH</p>
                            <p className="text-sm">TEL: +971 7 227 5747</p>
                            <p className="text-sm">FAX: +971 7 227 5788</p>
                            <p className="text-sm">P.O.BOX: 36625</p>
                        </div>
                        <div className="company-logo">FTS</div>
                        <div className="company-info-arabic">
                            <h1 className="text-xl font-bold text-orange-600">فايــر للخدمــات التقنيــة</h1>
                            <p className="text-sm">ABU DHABI أبوظبي</p>
                            <p className="text-sm">TEL: +971 2 491 8383</p>
                            <p className="text-sm">FAX: +971 2 491 8380</p>
                            <p className="text-sm">P.O.BOX: 30934</p>
                        </div>
                    </div>
                </div>

                {/* Reference and Date */}
                <div className="form-grid-2 form-section">
                    <div>
                        <label className="form-label">Reference Number</label>
                        <input type="text" className="form-input" />
                    </div>
                    <div>
                        <label className="form-label">Date</label>
                        <input type="date" className="form-input" />
                    </div>
                </div>

                {/* Inspector Details */}
                <div className="form-section orange-section">
                    <h2 className="section-title">Issuer (Inspector) Details</h2>
                    <div className="form-grid-2">
                        <div>
                            <label className="form-label">Visiting Time:</label>
                            <input type="time" className="form-input" />
                        </div>
                        <div>
                            <label className="form-label">Leaving Time:</label>
                            <input type="time" className="form-input" />
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="form-section orange-section">
                    <h2 className="section-title">Project Details</h2>
                    <div className="form-grid-3 mb-4">
                        <div>
                            <label className="form-label">Client</label>
                            <select className="form-select">
                                <option>Select Company</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Project</label>
                            <select className="form-select">
                                <option>Select Project</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Visit Schedule</label>
                            <select className="form-select">
                                <option>Select Visit Schedule</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-grid-2">
                        <div>
                            <label className="form-label">Location:</label>
                            <input type="text" className="form-input" />
                        </div>
                        <div>
                            <label className="form-label">Site Name:</label>
                            <input type="text" className="form-input" />
                        </div>
                    </div>
                </div>

                {/* Required Maintenance Work */}
                <div className="form-section">
                    <label className="form-label">Required Maintenance Work</label>
                    <div className="form-grid-2">
                        <div>
                            <label className="form-label text-white bg-red-400 p-2">Used Items</label>
                            <textarea className="form-textarea h-32"></textarea>
                        </div>
                        <div>
                            <label className="form-label text-white bg-red-400 p-2">Required Items</label>
                            <textarea className="form-textarea h-32"></textarea>
                        </div>
                    </div>
                </div>

                {/* Note */}
                <div className="form-section">
                    <label className="form-label bg-orange-50 p-2">Note</label>
                    <textarea className="form-textarea h-24"></textarea>
                </div>

                {/* System Checklists */}
                <div className="my-8">
                    <h2 className="main-section-title">System Checklist Summary</h2>

                    {renderTable('Fire Alarm System', fireAlarmRows, setFireAlarmRows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                    {renderTable('Fire Fighting Equipment', fireEquipmentRows, setFireEquipmentRows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                    {renderTable('FM-200 System', fm200Rows, setFm200Rows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                    {renderTable('Foam Bladder Tank System', foamRows, setFoamRows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                    {renderTable('Voice Evacuation System', voiceEvacRows, setVoiceEvacRows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                    {renderTable('Emergency Lighting', emergencyLightRows, setEmergencyLightRows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                    {renderTable('System Interfacing', interfaceRows, setInterfaceRows, { interface: '', status: 'Working', urgent: 'No', remarks: '' }, true)}
                    {renderTable('Exit Route and Storage Condition', exitRouteRows, setExitRouteRows, { item: '', status: '', urgent: 'No', remarks: '' }, true)}
                    {renderTable('Storage Conditions', storageRows, setStorageRows, { area: '', status: '', urgent: 'No', check: false, remarks: '' }, true, true)}
                    {renderTable('Pump', pumpRows, setPumpRows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                    {renderTable('Deluge Valve & Water Spray System', delugeRows, setDelugeRows, { item: '', totalQty: '', damaged: '', urgent: 'No', remarks: '' })}
                </div>

                {/* Urgent Rectification Summary */}
                <div className="form-section">
                    <h3 className="urgent-section">⚠️ Urgent Rectification Summary</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead className="table-header-urgent">
                                <tr>
                                    <th className="table-cell">Issue</th>
                                    <th className="table-cell">Location</th>
                                    <th className="table-cell">Recommended Action</th>
                                    <th className="table-cell">Deadline</th>
                                    <th className="table-cell w-16">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urgentIssues.map((issue, index) => (
                                    <tr key={index}>
                                        <td className="table-cell">
                                            <input
                                                type="text"
                                                value={issue.issue}
                                                onChange={(e) => updateRow(setUrgentIssues, index, 'issue', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="table-cell">
                                            <input
                                                type="text"
                                                value={issue.location}
                                                onChange={(e) => updateRow(setUrgentIssues, index, 'location', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="table-cell">
                                            <input
                                                type="text"
                                                value={issue.action}
                                                onChange={(e) => updateRow(setUrgentIssues, index, 'action', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="table-cell">
                                            <input
                                                type="date"
                                                value={issue.deadline}
                                                onChange={(e) => updateRow(setUrgentIssues, index, 'deadline', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="table-cell text-center">
                                            <button
                                                onClick={() => removeRow(setUrgentIssues, index)}
                                                className="btn-danger"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={() => addRow(setUrgentIssues, { issue: '', location: '', action: '', deadline: '' })}
                        className="btn-add"
                    >
                        <Plus size={18} /> Add New Row
                    </button>
                </div>

                {/* Next Due Date */}
                <div className="form-section orange-section">
                    <h3 className="section-title">Next Due Date</h3>
                    <div className="form-grid-2">
                        <div>
                            <label className="form-label">Next Inspection Due:</label>
                            <input type="date" className="form-input" />
                        </div>
                        <div>
                            <label className="form-label">Expiry Update Required On:</label>
                            <input type="date" className="form-input" />
                        </div>
                    </div>
                </div>

                {/* Notes/Used Items */}
                <div className="form-section">
                    <label className="form-label bg-orange-50 p-2">Notes/Used Items</label>
                    <textarea className="form-textarea h-24"></textarea>
                </div>

                {/* Scope of Inspection */}
                <div className="form-section orange-section">
                    <h3 className="section-title">Scope Of Inspection</h3>
                    <textarea className="form-textarea h-32" defaultValue="All components designated for inspection at the site, standards of practiced person are inspected except as may be noted in the limitations of inspection sections within this report. This inspection is visual only. A representative sample of site components are viewed in areas that are accessible at the time of inspection. No destructive testing or dismantling of site components is performed. Not all improvements will be identified during this inspection. Unexpected repairs should still be anticipated. The inspection should not be considered a guarantee or warranty of any kind."></textarea>
                </div>

                {/* Declaration */}
                <div className="form-section orange-section">
                    <h3 className="section-title">Declaration</h3>
                    <textarea className="form-textarea h-24"></textarea>
                </div>

                {/* Upload Files and Signature */}
                <div className="form-grid-2 form-section">
                    <div>
                        <label className="form-label">Upload Files</label>
                        <input type="file" className="form-input" multiple />
                    </div>
                    <div>
                        <label className="form-label">Signature</label>
                        <div className="border border-gray-400 rounded h-32 bg-gray-50"></div>
                        <div className="flex gap-2 mt-2">
                            <button className="btn-secondary">Clear</button>
                            <button className="btn-primary">Save</button>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button className="btn-submit" onClick={handleSubmit}>
                        Submit Report
                    </button>
                    <p className="text-sm text-gray-600 mt-2">save signature before report submit</p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t text-center text-sm text-gray-600">
                    <p>Inspector Signature: ________________</p>
                    <p className="mt-2">Client EID Details: ________________</p>
                    <p>Client Phone number: ________________</p>
                    <p className="mt-4">Copyright © 2020 <span className="text-red-500 font-semibold">FTS Portal</span> All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}